import { Data } from "@/types/response";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getYtThumbnail } from "@/lib/utils";

export default function TopNews({
  data,
  hideViewAll,
}: {
  data?: Data[];
  hideViewAll?: boolean;
}) {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            শীর্ষ খবর
          </h2>
          <div className="h-1 flex-1 mx-6 bg-gray-100 rounded-full hidden md:block" />
          {!hideViewAll && (
            <Link
              href="/top-news"
              className="group flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((news) => (
            <Link
              href={`/news/${news.id}`}
              key={news.id}
              className="group block h-full"
            >
              <article className="relative h-96 w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                {(news.images.length > 0 ||
                  (news.videos && news.videos.length > 0)) && (
                  <Image
                    src={
                      news.images.length > 0
                        ? news.images[0]
                        : getYtThumbnail(news.videos[0])
                    }
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}

                {/* Strong Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-300" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-sm">
                    {news.category?.name}
                  </span>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col gap-3">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-300 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{format(new Date(news.created_on), "PPP")}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {news.title}
                  </h3>

                  {/* Read More Link */}
                  <div className="flex items-center text-white/90 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
