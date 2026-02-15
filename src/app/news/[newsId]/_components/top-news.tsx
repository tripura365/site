import { getTopNews } from "@/actions/news";
import TopNews from "@/components/custom/top-news";

export default async function TopNewsSC() {
  const data = await getTopNews();

  return <TopNews data={data?.slice(0, 6)} />;
}
