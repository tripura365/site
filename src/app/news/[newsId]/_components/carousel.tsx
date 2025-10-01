import { getTopNews } from "@/actions/news";
import HeroCarousel from "@/components/custom/hero-carousel";

export default async function CarouselSC() {
  const { data } = await getTopNews();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <HeroCarousel data={data ?? []} />
    </section>
  );
}
