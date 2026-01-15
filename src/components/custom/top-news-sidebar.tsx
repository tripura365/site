import { Data } from "@/types/response";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn, getYtThumbnail } from "@/lib/utils";

interface TopNewsSidebarProps {
  data: Data[];
  className?: string;
}

export default function TopNewsSidebar({
  data,
  className,
}: TopNewsSidebarProps) {
  return (
    <div className={cn("flex flex-col gap-4 h-full", className)}>
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <h3 className="font-bold text-xl text-gray-800">শীর্ষ খবর</h3>
        <Link
          href="/top-news"
          className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wider"
        >
          View All
        </Link>
      </div>

      <div className="flex-1 grid lg:grid-rows-3 lg:grid-cols-1 sm:grid-cols-2 gap-3">
        {/* We map the data, but if fewer than 3, the grid cells remain empty. 
                    If we strictly want 3 slots always (even placeholders), we'd need to pad the array, 
                    but just having the first item take 1/3 height satisfies 'add spacing for 3'. */}
        {data.map((news) => (
          <Link
            key={news.id}
            href={`/news/${news.id}`}
            className="@container group relative w-full lg:h-full aspect-video lg:aspect-auto rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Background Image */}
            {(news.images && news.images.length > 0) ||
            (news.videos && news.videos.length > 0) ? (
              <Image
                src={
                  news.images && news.images.length > 0
                    ? news.images[0]
                    : getYtThumbnail(news.videos[0])
                }
                alt={news.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-3 z-10 flex flex-col gap-0.5">
              {/* Category Badge */}
              <span className="inline-block px-1.5 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded-full w-fit mb-1">
                {news.category?.name}
              </span>

              <h4 className="lg:text-sm font-bold text-white line-clamp-1 @sm:line-clamp-2 leading-tight group-hover:text-red-400 transition-colors">
                {news.title}
              </h4>

              <div className="flex items-center gap-1.5 text-[10px] text-gray-300 font-medium mt-1">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(news.created_on), "MMM d, yyyy")}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
