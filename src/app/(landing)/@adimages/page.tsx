import {
  getLandscapeAdBannerImages,
  getPortraitAdBannerImages,
  getTenderAdBannerImages,
} from "@/actions/news";
import AdImages from "@/components/custom/ad-images";

export default async function Page() {
  const { data: wideAdData } = await getLandscapeAdBannerImages();
  const { data: longAdData } = await getPortraitAdBannerImages();
  const { data: tenderAdData } = await getTenderAdBannerImages();

  return (
    <AdImages
      wideData={wideAdData}
      tallData={longAdData}
      tenderData={tenderAdData}
    />
  );
}
