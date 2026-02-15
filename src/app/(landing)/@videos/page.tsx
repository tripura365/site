import { getVideoNews } from "@/actions/news";
import VideoNews from "@/components/custom/video-news";

export default async function Page() {
  const data = await getVideoNews();

  return (
    <div id="video-news">
      <VideoNews data={data?.slice(0, 6)} />
    </div>
  );
}
