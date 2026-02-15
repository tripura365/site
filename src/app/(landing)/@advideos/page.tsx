import { getAdVideos } from "@/actions/news";
import AdVideos from "@/components/custom/ad-videos";

export const revalidate = 60 * 10;

export default async function Page() {
  const data = await getAdVideos();

  return <AdVideos data={data} />;
}
