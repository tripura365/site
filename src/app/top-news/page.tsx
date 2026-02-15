import { getTopNews } from "@/actions/news";
import TopNews from "@/components/custom/top-news";

export default async function Page() {
  const data = await getTopNews();

  return <TopNews data={data} hideViewAll />;
}
