import { getTrendingNews } from "@/actions/news";
import TrendingNews from "@/components/custom/trending-news";

export const revalidate = 600;

export default async function Page() {
  const data = await getTrendingNews();

  return (
    <div id="trending">
      <TrendingNews data={data?.slice(0, 6)} />
    </div>
  );
}
