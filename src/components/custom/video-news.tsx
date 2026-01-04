import { getViews } from "@/lib/utils";
import { Data } from "@/types/response";
import { format } from "date-fns";
import { ArrowRight, Calendar, Eye } from "lucide-react";
import Link from "next/link";

export default function VideoNews({
  data,
  hideShowAll,
}: {
  data?: Data[];
  hideShowAll?: boolean;
}) {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            ভিডিও সংবাদ
          </h2>
          <div className="h-1 flex-1 mx-6 bg-gray-100 rounded-full hidden md:block" />
          {!hideShowAll && (
            <Link
              href={"video-news"}
              className="group flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              Watch All
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
              <article className="relative h-96 w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-black">
                {/* Full Background Video (Iframe) */}
                {news.videos?.[0] && (
                  <iframe
                    src={`https://www.youtube.com/embed/${news.videos[0]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${news.videos[0]}`}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-150"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}

                {/* Strong Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300" />

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col gap-3">
                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-gray-300 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>
                        {getViews({
                          published_on: news.published_on,
                          seed: news.body,
                        })}{" "}
                        views
                      </span>
                    </div>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{format(new Date(news.published_on), "PPP")}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
                    {news.title}
                  </h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
