import { getLatestNews } from "@/actions/news";
import { getViews } from "@/lib/utils";
import { format } from "date-fns";
import { Clock, Eye, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60 * 10;

export default async function Page() {
  const { data } = await getLatestNews();
  const [post] = data ?? [];
  return post ? (
    <section className="py-16 bg-gray-50" id="latest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Latest Post</h2>
        </div>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <div className="w-full h-64 lg:h-full">
                {post?.images.length && (
                  <Image
                    src={post.images[0]}
                    alt={post.title}
                    height={650}
                    width={550}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                  {post?.category.name}
                </span>
                <span className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full">
                  Latest
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>
                    {post?.created_on &&
                      format(new Date(post.created_on), "PPP")}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                {post?.title}
              </h1>

              <p className="text-gray-700 text-lg mb-4 leading-relaxed line-clamp-[10]">
                {post?.body}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"></div>
                  {/* <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">Share</span>
                  </div> */}
                </div>

                <Link href={`/news/${post?.id}`}>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5">
                    Read Full Article
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  ) : null;
}
