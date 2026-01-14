import { getImageGallery, getTopNews } from "@/actions/news";
import HeroCarousel from "@/components/custom/hero-carousel";
import TopNewsSidebar from "@/components/custom/top-news-sidebar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { data: topNews } = await getTopNews();
  const { data: imageGallery } = await getImageGallery();

  return (
    <>
      {children}

      {/* Footer Section: Carousel + Top News Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Carousel */}
          <div className="lg:col-span-3">
            <HeroCarousel data={imageGallery ?? []} />
          </div>

          {/* Side News */}
          <div className="lg:col-span-1 h-full min-h-[400px]">
            <TopNewsSidebar data={topNews?.slice(0, 3) ?? []} />
          </div>
        </div>
      </section>
    </>
  );
}
