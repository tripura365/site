import { getTopNews } from "@/actions/news";
import TopNews from "@/components/custom/top-news";

export const revalidate = 60 * 10;

export default async function Page() {
  const data = await getTopNews();

  return <TopNews data={data?.slice(0, 6)} />;
}
