import { type IconType } from "react-icons";
import {
  LuAtom,
  LuBriefcase,
  LuBuilding2,
  LuCalendarDays,
  LuCircleDollarSign,
  LuGraduationCap,
  LuHeart,
  LuHeartHandshake,
  LuMailOpen,
  LuMegaphone,
  LuPresentation,
  LuScale,
  LuScrollText,
  LuStickyNote,
  LuUsers,
  LuWallet,
} from "react-icons/lu";

import { mailTo } from "@/utils/prefixes";
import { RouteGroup } from "./route-builder";

export const headerRoutes: Array<
  | {
      label: string;
      href: string;
    }
  | {
      label: string;
      links: Array<{
        label: string;
        href: string;
        description: string;
        icon: IconType;
      }>;
    }
> = [
  {
    label: "Hjem",
    href: "/",
  },
  {
    label: "For studenter",
    links: [
      {
        label: "Arrangementer",
        href: "/for-studenter/arrangementer",
        description: "Oversikt over kommende og tidligere arrangementer",
        icon: LuCalendarDays,
      },
      {
        label: "Jobber",
        href: "/for-studenter/jobber",
        description: "Se hvilke jobber som er tilgjengelig for studenter",
        icon: LuCircleDollarSign,
      },
      {
        label: "Innlegg",
        href: "/for-studenter/innlegg",
        description: "Nyheter og oppdateringer fra echo",
        icon: LuMailOpen,
      },
      {
        label: "Hovedstyre",
        href: "/for-studenter/grupper/hovedstyre",
        description: "Oversikt over hovedstyret",
        icon: LuUsers,
      },
      {
        label: "Undergrupper",
        href: "/for-studenter/grupper/undergrupper",
        description: "Oversikt over undergrupper",
        icon: LuUsers,
      },
      {
        label: "Underorganisasjoner",
        href: "/for-studenter/grupper/underorganisasjoner",
        description: "Oversikt over underorganisasjoner",
        icon: LuUsers,
      },
      {
        label: "Interessegrupper",
        href: "/for-studenter/grupper/interessegrupper",
        description: "Oversikt over interessegrupper",
        icon: LuUsers,
      },
      {
        label: "Idrettslag",
        href: "/for-studenter/grupper/idrettslag",
        description: "Oversikt over idrettslag",
        icon: LuUsers,
      },
      {
        label: "Møtereferater",
        href: "/for-studenter/motereferater",
        description: "Referater fra møter og generalforsamlinger i echo",
        icon: LuScrollText,
      },
      {
        label: "Masterinfo",
        href: "/for-studenter/masterinfo",
        description: "Informasjon til deg som tar master",
        icon: LuGraduationCap,
      },
      {
        label: "Økonomisk støtte",
        href: "/for-studenter/okonomisk-stotte",
        description: "Økonmisk støtte for arrangementer og aktiviteter",
        icon: LuCircleDollarSign,
      },
      {
        label: "Anonyme tilbakemeldinger",
        href: "/for-studenter/anonyme-tilbakemeldinger",
        description: "Send anonyme tilbakemeldinger",
        icon: LuMegaphone,
      },
      {
        label: "Utlegg",
        href: "/for-studenter/utlegg",
        description: "Sende inn faktura og utlegg",
        icon: LuWallet,
      },
      {
        label: "Si ifra",
        href: "/for-studenter/si-ifra",
        description: "Opplevd noe kjipt? Si ifra!",
        icon: LuHeart,
      },
    ],
  },
  {
    label: "For bedrifter",
    links: [
      {
        label: "Bedriftspresentasjon",
        href: "/for-bedrifter/bedriftspresentasjon",
        description: "Ønsker du å presentere bedriften din?",
        icon: LuPresentation,
      },
      {
        label: "Stillingsannonser",
        href: "/for-bedrifter/stillingsutlysninger",
        description: "Informasjon om stillingsutlysninger på våre nettsider",
        icon: LuBriefcase,
      },
    ],
  },
  {
    label: "Om echo",
    links: [
      {
        label: "Om oss",
        href: "/om/echo",
        description: "Om echo",
        icon: LuAtom,
      },
      {
        label: "Instituttrådet",
        href: "/om/instituttradet",
        description: "Om instituttrådet",
        icon: LuBuilding2,
      },
      {
        label: "Vedtekter",
        href: "/om/vedtekter",
        description: "Vedtekter",
        icon: LuScale,
      },
      {
        label: "Bekk",
        href: "/om/bekk",
        description: "Om Bekk, vår samarbeidspartner",
        icon: LuHeartHandshake,
      },
      {
        label: "Brosjyre",
        href: "/om/brosjyre",
        description: "Brosjyre med informasjon om echo",
        icon: LuStickyNote,
      },
      {
        label: "Programstyrene",
        href: "/om/programstyrene",
        description: "Oversikt over programstyrene",
        icon: LuUsers,
      },
    ],
  },
];

const sidebarRoutes = new RouteGroup("/admin", { label: "Admin" })
  .link("/", { label: "Dashboard" })
  .link("/feedback", { label: "Tilbakemeldinger" })
  .link("/users", { label: "Brukere" })
  .build();

const contactUsRoutes = new RouteGroup("", { label: "Kontakt oss ☎️" })
  .link(mailTo("echo@uib.no"), {
    label: "echo@uib.no",
    isExternal: true,
  })
  .link("https://goo.gl/maps/adUsBsoZh3QqNvA36", {
    label: "Thormøhlens gate 55 5006 BERGEN",
    isExternal: true,
  })
  .link("https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=998995035", {
    label: "Organisasjonsnummer: 998 995 035",
    isExternal: true,
  })
  .link("/for-studenter/si-ifra", {
    label: "Opplevd noe kjipt? Si ifra!",
    isExternal: false,
  })
  .build();

const followUsRoutes = new RouteGroup("", { label: "Følg oss 💻" })
  .link("https://www.facebook.com/groups/informatikk", {
    label: "Facebook",
    isExternal: true,
  })
  .link("https://www.instagram.com/echo_uib/", {
    label: "Instagram",
    isExternal: true,
  })
  .link("https://github.com/echo-webkom", {
    label: "GitHub",
    isExternal: true,
  })
  .build();

export const adminRoutes = [sidebarRoutes];
export const footerRoutes = [contactUsRoutes, followUsRoutes];
