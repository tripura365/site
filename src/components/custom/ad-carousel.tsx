import { cn } from "@/lib/utils";
import { AdBannerImageData } from "@/types/response";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function AdCarousel({ data }: { data?: AdBannerImageData[] }) {
  const [activeAd, setActiveAd] = useState<AdBannerImageData>();

  return (
    <div className="relative h-full">
      <Swiper
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        modules={[Pagination, Autoplay]}
        loop
        className="size-full"
      >
        {data?.map((ad, ad_idx) => (
          <SwiperSlide key={ad.id}>
            <img
              src={ad.image_url}
              alt={`Advertisement ${ad_idx + 1}`}
              height={100}
              width={200}
              className={cn(
                "size-full transition-all duration-500 delay-500 absolute top-0 left-0",
              )}
              onClick={() => setActiveAd(ad)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {activeAd ? (
        <Dialog
          open={!!activeAd}
          onOpenChange={(e) => !e && setActiveAd(undefined)}
        >
          <DialogContent className="min-w-1/2 h-fit p-5">
            <DialogHeader className="hidden">
              <DialogTitle />
            </DialogHeader>
            <img
              src={activeAd!.image_url}
              alt={`Advertisement ${activeAd!.image_id + 1}`}
              height={300}
              width={600}
              className={cn(
                "w-full max-h-[calc(90dvh)] transition-all duration-500 delay-500",
              )}
            />
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}
