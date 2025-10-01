import {
  getCategoryWiseNews,
  getLatestNews,
  getNewsInfo,
  getTopNews,
  getTrendingNews,
} from "@/actions/news";
import GotoPrev from "@/components/custom/go-to-prev";
import { format } from "date-fns";
import { ArrowLeft, Clock, Eye, Facebook, Share2, Twitter } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import FbShare from "./_components/fb-share";
import { getViews } from "@/lib/utils";

// const FbShare = dynamic(() => import("./_components/fb-share"), { ssr: false });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ newsId: string }>;
}): Promise<Metadata> {
  const { newsId } = await params;
  const article = await getNewsInfo(newsId);
  const headerInfo = await headers();
  const protocol = headerInfo.get("x-forwarded-proto") ?? "http";
  const host = headerInfo.get("host");

  return {
    title: article?.title,
    description: article?.body.slice(0, 200),
    openGraph: {
      title: article?.title,
      description: article?.body.slice(0, 200),
      url: `${protocol}://${host}/news/${newsId}`,
      images: [
        {
          url: article?.images[0],
          width: 1200,
          height: 630,
          alt: article?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article?.title,
      description: article?.body.slice(0, 200),
      images: [article?.images[0]],
    },
  };
}

export async function generateStaticParams() {
  const newsSet = new Set<number>();

  (await getTopNews()).data?.forEach((news) => newsSet.add(news.id));
  (await getLatestNews()).data?.forEach((news) => newsSet.add(news.id));
  (await getTrendingNews()).data?.forEach((news) => newsSet.add(news.id));
  (await getCategoryWiseNews()).data?.forEach((cat) =>
    cat.articles.forEach((news) => newsSet.add(news.id))
  );

  return Array.from(newsSet).map((id) => ({ newsId: id.toString() }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) {
  const { newsId } = await params;
  const headerList = await headers();

  const protocol = headerList.get("x-forwarded-proto");
  const origin = headerList.get("host");
  const basePath = `${protocol}://${origin}`;

  const article = await getNewsInfo(newsId);

  return (
    !!article && (
      <div className="min-h-screen bg-gray-50">
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Article Header */}
          <header className="mb-8">
            <GotoPrev className="items-center gap-3 mb-6">
              <button className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer size-10 border rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <span className="text-lg font-medium">Back to Homepage</span>
            </GotoPrev>
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                {article.category.name}
              </span>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{format(article.published_on, "PPP")}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>
                    {getViews({
                      published_on: article.published_on,
                      seed: article.body,
                    })}
                    &nbsp; views
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <div className="w-full h-64 md:h-96">
              {article.images?.length && (
                <Image
                  src={article.images[0]}
                  alt={article.title}
                  height={200}
                  width={650}
                  className="size-full object-cover rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <article className="text-gray-800 leading-relaxed space-y-6 lg:text-xl text-lg">
              {article.body}
            </article>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full hover:bg-gray-300 cursor-pointer transition-colors">
                {article.category.name}
              </span>
            </div>
          </div>

          {/* Social Share */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Share this article
            </h4>
            <div className="flex items-center space-x-4">
              <FbShare url={`${basePath}/news/${newsId}`}>
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </button>
              </FbShare>
            </div>
          </div>
        </article>
      </div>
    )
  );
}
