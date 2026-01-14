import { getViews, getYtThumbnail } from "@/lib/utils";
import { Data } from "@/types/response";
import { Eye, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TrendingNews({ data }: { data?: Data[] }) {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-12">
          <TrendingUp className="h-8 w-8 text-red-600 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            বর্তমানে জনপ্রিয়
          </h2>
          <div className="h-1 flex-1 mx-6 bg-gray-100 rounded-full hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((post, index) => (
            <Link href={`/news/${post.id}`} key={post.id} className="group block h-full">
              <article className="relative h-96 w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Full Background Image */}
                {(post.images.length > 0 || (post.videos && post.videos.length > 0)) && (
                  <Image
                    src={post.images.length > 0 ? post.images[0] : getYtThumbnail(post.videos[0])}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}

                {/* Strong Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-300" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  <span className="self-start px-3 py-1 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-sm">
                    {post.category.name}
                  </span>
                </div>

                {/* Ranking / Trending Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-full shadow-lg">
                    #{index + 1}
                  </span>
                </div>

                {/* Bottom Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col gap-3">
                  {/* Views */}
                  <div className="flex items-center gap-2 text-gray-300 text-xs font-medium">
                    <Eye className="h-3.5 w-3.5" />
                    <span>
                      {getViews({
                        published_on: post.published_on,
                        seed: post.body,
                      })} views
                    </span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span className="flex items-center gap-1 text-orange-400">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
                    {post.title}
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
