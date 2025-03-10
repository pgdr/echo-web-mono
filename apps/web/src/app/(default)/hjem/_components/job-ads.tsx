import { JobAdPreview } from "@/components/job-ad-preview";
import { fetchAvailableJobAds } from "@/sanity/job-ad";
import { BentoBox } from "./bento-box";

export const JobAds = async ({ className }: { className?: string }) => {
  const jobAds = await fetchAvailableJobAds(4);

  if (!jobAds.length) {
    return null;
  }

  return (
    <BentoBox
      title="Stillingsannonser"
      href="/for-studenter/stillingsannonser"
      className={className}
    >
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {jobAds.map((jobAd) => (
          <li key={jobAd._id}>
            <JobAdPreview jobAd={jobAd} />
          </li>
        ))}
      </ul>
    </BentoBox>
  );
};
