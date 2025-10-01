import {
  getCategoryWiseNews,
  getLatestNews,
  getTopNews,
  getTrendingNews,
  getVideoNews,
} from "@/actions/news";
import { Data } from "@/types/response";
import { headers } from "next/headers";
import RSS from "rss";

export async function GET() {
  const headerList = await headers();
  const origin = headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") || "http";
  const site_url = `${protocol}://${origin}`;
  const feed_url = `${site_url}/rss`;

  const feed = new RSS({
    title: "Home Feed",
    description: "The RSS contains description about home page only",
    site_url,
    feed_url,
    language: "bn",
  });

  const topNews = (await getTopNews()).data;
  const latestPost = (await getLatestNews())?.data?.[0];
  const trendingNews = (await getTrendingNews()).data;
  const videoNews = (await getVideoNews()).data;
  const categoryWiseNews = (await getCategoryWiseNews())?.data?.reduce<Data[]>(
    (acc, cat) => {
      return acc.concat(cat.articles);
    },
    []
  );

  const data_acc = [
    ...(topNews ?? []),
    latestPost,
    ...(trendingNews ?? []),
    videoNews,
    ...(categoryWiseNews ?? []),
  ] as Data[];

  data_acc.forEach((data) => {
    if (data)
      feed.item({
        title: data.title,
        description: data.body?.slice(0, 200),
        date: new Date(data.published_on),
        url: `${site_url}/news/${data.id}`,
      });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
