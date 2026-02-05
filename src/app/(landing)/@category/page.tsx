import { getAllCategories, getCategoryWiseNews } from "@/actions/news";
import { format } from "date-fns";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getYtThumbnail } from "@/lib/utils";

export default async function Page() {
  const res = await getCategoryWiseNews();
  const category_res = await getAllCategories();

  const getCategoryByName = (name: string) => {
    return category_res.data.find((cat) => cat.name === name)!;
  };

  return (
    <section className="py-12 md:py-20 bg-white" id="category">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            বিভাগভিত্তিক খবর
          </h2>
          <div className="h-1 flex-1 mx-6 bg-gray-100 rounded-full hidden md:block" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {res.data?.map((category) => (
            <div key={category.name} className="flex flex-col gap-6">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-red-600 rounded-full" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.name}
                  </h3>
                </div>
                <Link
                  href={`/category/${getCategoryByName(category.name).id}`}
                  className="group flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  View All
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Articles */}
              <div className="space-y-6">
                {/* Featured Article (First one) */}
                {category.articles?.[0] && (
                  <Link
                    href={`/news/${category.articles[0].id}`}
                    className="group block"
                  >
                    <article className="relative h-72 w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      {(category.articles[0].images.length > 0 ||
                        (category.articles[0].videos &&
                          category.articles[0].videos.length > 0)) && (
                        <img
                          src={
                            category.articles[0].images.length > 0
                              ? category.articles[0].images[0]
                              : getYtThumbnail(category.articles[0].videos[0])
                          }
                          alt={category.articles[0].title}
                          // fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105 size-full"
                        />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90" />
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        <h4 className="text-xl font-bold text-white line-clamp-2 mb-3 group-hover:text-red-400 transition-colors leading-snug">
                          {category.articles[0].title}
                        </h4>
                        <div className="flex items-center gap-2 text-gray-300 text-xs font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {format(
                              new Date(category.articles[0].published_on),
                              "PPP",
                            )}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )}

                {/* List of other articles */}
                <div className="space-y-5">
                  {category.articles?.slice(1, 4).map((article) => (
                    <Link
                      href={`/news/${article.id}`}
                      key={article.id}
                      className="group block"
                    >
                      <article className="flex gap-5 items-start p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden shadow-sm">
                          {(article.images.length > 0 ||
                            (article.videos && article.videos.length > 0)) && (
                            <img
                              src={
                                article.images.length > 0
                                  ? article.images[0]
                                  : getYtThumbnail(article.videos[0])
                              }
                              alt={article.title}
                              // fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300 size-full"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 py-1">
                          <h4 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                              {format(
                                new Date(article.published_on),
                                "MMM d, yyyy",
                              )}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
