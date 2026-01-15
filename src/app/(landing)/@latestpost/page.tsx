import { getLatestNews } from "@/actions/news";
import { getYtThumbnail } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 600;

export default async function Page() {
  const { data } = await getLatestNews();
  const [post] = data ?? [];

  if (!post) return null;

  return (
    <section className="py-12 md:py-20 bg-white" id="latest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            সর্বশেষ খবর
          </h2>
          <div className="h-1 flex-1 mx-6 bg-gray-100 rounded-full hidden md:block" />
        </div>

        <Link href={`/news/${post.id}`} className="group block">
          <div className="@container relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image with Zoom Effect */}

            <Image
              src={
                post.images[0] ? post.images[0] : getYtThumbnail(post.videos[0])
              }
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row items-end justify-between gap-6">
              <div className="max-w-3xl space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-4 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full shadow-sm">
                    {post?.category?.name}
                  </span>
                  <span className="px-4 py-1.5 bg-red-600/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full shadow-sm animate-pulse">
                    Latest
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-white leading-tight drop-shadow-lg @sm:line-clamp-3 line-clamp-1">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-gray-200 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {post.created_on &&
                        format(new Date(post.created_on), "PPP")}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg line-clamp-2 md:line-clamp-3 max-w-2xl leading-relaxed">
                  {post.body}
                </p>
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <button className="text-nowrap flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:bg-blue-50 hover:scale-105 shadow-lg group-hover:shadow-blue-900/20">
                  Read Full Article
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
