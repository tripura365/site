import {
  getCategoryWiseNews,
  getLatestNews,
  getNewsInfo,
  getTopNews,
  getTrendingNews,
} from "@/actions/news";
import GotoPrev from "@/components/custom/go-to-prev";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Facebook,
  Share2,
  Tag,
} from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import FbShare from "./_components/fb-share";
import WaShare from "./_components/wa-share";
import { getViews, getYtThumbnail } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";

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

  if (!article || (article as any).error) return {};

  return {
    title: article?.title,
    description: article?.body.slice(0, 200),
    openGraph: {
      title: article?.title,
      description: article?.body.slice(0, 200),
      url: `${protocol}://${host}/news/${newsId}`,
      images: [
        {
          url:
            article?.images[0] ||
            (article?.videos?.[0] ? getYtThumbnail(article.videos[0]) : ""),
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
      images: [
        article?.images[0] ||
          (article?.videos?.[0] ? getYtThumbnail(article.videos[0]) : ""),
      ],
    },
  };
}

export async function generateStaticParams() {
  const newsSet = new Set<number>();

  (await getTopNews()).data?.forEach((news) => newsSet.add(news.id));
  (await getLatestNews()).data?.forEach((news) => newsSet.add(news.id));
  (await getTrendingNews()).data?.forEach((news) => newsSet.add(news.id));
  (await getCategoryWiseNews()).data?.forEach((cat) =>
    cat.articles.forEach((news) => newsSet.add(news.id)),
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

  if (!article || (article as any)?.error)
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center flex flex-col items-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Article Not Found
          </h2>
          <p className="text-gray-500">
            The article you are looking for does not exist or has been removed.
          </p>
          <div className="flex justify-center">
            <GotoPrev>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Go Back Home
              </button>
            </GotoPrev>
          </div>
        </div>
      </div>
    );

  const image = article.images?.[0]
    ? article.images[0]
    : article.videos?.[0]
      ? getYtThumbnail(article.videos[0])
      : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax-like effect */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {image && (
          <img
            src={image}
            alt={article.title}
            // fill
            className="object-cover size-full"
            // priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <GotoPrev className="absolute top-8 left-4 sm:left-8 text-white/80 hover:text-white transition-colors flex items-center gap-2 group cursor-pointer">
            <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </div>
            <span className="font-medium hidden sm:block">Back</span>
          </GotoPrev>

          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-600/20">
                {article?.category?.name}
              </span>
              <div className="flex items-center gap-2 text-gray-300 text-sm bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Clock className="h-4 w-4" />
                <span>
                  {article.published_on && format(article.published_on, "PPP")}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl drop-shadow-lg">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span className="font-medium">
                  {getViews({
                    published_on: article.published_on,
                    seed: article.body,
                  })}{" "}
                  views
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-20">
        <div className="bg-white rounded-t-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          {/* Share Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <span className="font-bold text-xl">T</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Tripura 365</p>
                <p className="text-sm text-gray-500">Editorial Team</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FbShare url={`${basePath}/news/${newsId}`}>
                <button
                  className="p-2.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </button>
              </FbShare>
              <WaShare url={`${basePath}/news/${newsId}`} title={article.title}>
                <button
                  className="p-2.5 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp className="h-5 w-5" />
                </button>
              </WaShare>
              <button
                className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                title="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Video Section */}
          {article.videos && article.videos.length > 0 && (
            <div className="mb-8 w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${article.videos[0]}`}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={article.title}
              />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 first-letter:mr-3 first-letter:float-left">
              {article.body}
            </p>
          </div>

          {/* Tags Section */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold">
              <Tag className="h-5 w-5" />
              <span>Related Topics</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer font-medium text-sm">
                {article?.category?.name}
              </span>
              <span className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer font-medium text-sm">
                Tripura News
              </span>
              <span className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer font-medium text-sm">
                Latest Updates
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
