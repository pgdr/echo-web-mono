"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { registrations, registrationStatusEnum } from "@echo-webkom/db/schemas";
import { db } from "@echo-webkom/db/serverless";
import { GotSpotNotificationEmail } from "@echo-webkom/email";
import { emailClient } from "@echo-webkom/email/client";

import { revalidateRegistrations } from "@/data/registrations/revalidate";
import { getUser } from "@/lib/get-user";
import { isHost } from "@/lib/memberships";

const updateRegistrationPayloadSchema = z.object({
  status: z.enum(registrationStatusEnum.enumValues),
  reason: z.string(),
});

export const updateRegistration = async (
  happeningId: string,
  registrationUserId: string,
  payload: z.infer<typeof updateRegistrationPayloadSchema>,
) => {
  try {
    const user = await getUser();

    if (!user) {
      return {
        success: false,
        message: "Du er ikke logget inn",
      };
    }

    const exisitingRegistration = await db.query.registrations.findFirst({
      where: (registration) =>
        and(eq(registration.happeningId, happeningId), eq(registration.userId, registrationUserId)),
      with: {
        happening: {
          with: {
            groups: true,
          },
        },
        user: true,
      },
    });

    if (!exisitingRegistration) {
      return {
        success: false,
        message: "Denne personen er ikke påmeldt arrangementet",
      };
    }

    const groups = exisitingRegistration.happening.groups.map((group) => group.groupId);
    if (!isHost(user, groups)) {
      return {
        success: false,
        message: "Du kan ikke endre påmeldingen til en arrangør",
      };
    }

    const data = updateRegistrationPayloadSchema.parse(payload);

    await db
      .update(registrations)
      .set({
        prevStatus: exisitingRegistration.status,
        changedBy: user.id,
        changedAt: new Date(),
        status: data.status,
        unregisterReason: data.reason,
      })
      .where(
        and(
          eq(registrations.userId, registrationUserId),
          eq(registrations.happeningId, happeningId),
        ),
      );

    if (data.status === "registered") {
      const sendTo =
        exisitingRegistration.user.alternativeEmail ?? exisitingRegistration.user.email;

      await emailClient.sendEmail(
        [sendTo],
        "Du har fått plass!",
        GotSpotNotificationEmail({
          happeningTitle: exisitingRegistration.happening.title,
          name: exisitingRegistration.user.name ?? exisitingRegistration.user.email,
        }),
      );
    }

    revalidateRegistrations(happeningId, user.id);

    return {
      success: true,
      message: "Påmeldingen er endret",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Grunnen er ikke i riktig format",
      };
    }
    return {
      success: false,
      message: "En feil har oppstått",
    };
  }
};
