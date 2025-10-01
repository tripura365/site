import { getCategoryWiseNews, getCategoryNewsInfo } from "@/actions/news";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft, Clock } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const res = await getCategoryWiseNews();

  return (
    res.data?.map((category) => ({
      cId: category.articles[0].category.id.toString(),
    })) ?? []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cId: string }>;
}): Promise<Metadata> {
  const { cId } = await params;
  const res = await getCategoryWiseNews();

  const category = res.data?.find(
    (cat) => cat.articles[0].category.id === Number(cId)
  );

  return {
    title: category?.name,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ cId: string }>;
}) {
  const { cId } = await params;
  const res = await getCategoryNewsInfo(cId);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:underline flex items-center">
              <Button
                variant={"outline"}
                size={"icon"}
                className="rounded-full size-10"
              >
                <ArrowLeft />
              </Button>
            </Link>
            <div>
              <span className="text-red-600">Category</span>
              <h2 className="text-3xl font-bold text-gray-900">
                {res.data?.[0]?.category.name}
              </h2>
              <div className="bg-red-600 w-20 h-[5px] rounded mt-5"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {res.data?.map((news) => (
            <Link href={`/news/${news.id}`} key={news.id} className="block">
              <article className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  {news.images.length && (
                    <div className="w-full h-48">
                      <Image
                        src={news.images[0]}
                        alt={news.title}
                        height={100}
                        width={150}
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                    {news.category.name}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {news.title}
                </h3>

                <p className="text-sm text-foreground/75 line-clamp-3 mb-2">
                  {news.body}
                </p>

                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{format(new Date(news.created_on), "PPP")}</span>
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
