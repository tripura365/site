import { getVideoNews } from "@/actions/news";
import VideoNews from "@/components/custom/video-news";

export default async function Page() {
  const res = await getVideoNews();

  return <VideoNews hideShowAll data={res} />;
}
