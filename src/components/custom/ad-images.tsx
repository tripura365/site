"use client";

import { AdBannerImageData } from "@/types/response";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AdCarousel from "./ad-carousel";

export default function AdImages({
  wideData,
  tallData,
}: {
  wideData?: AdBannerImageData[];
  tallData?: AdBannerImageData[];
}) {
  return (
    <section className="py-12 md:py-20 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">বিজ্ঞাপন</h2>
          <div className="h-1 flex-1 mx-6 bg-gray-100 rounded-full hidden md:block" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                Disclaimer <Info className="ml-1 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="space-y-4">
              <h3 className="font-bold">Disclaimer</h3>
              <p className="text-muted-foreground text-sm">
                Integrity of any product/service/scheme is intellectual
                responsibility of the Advertiser itself. Tripura 365.com takes
                no responsibility related to commitments made by an advertiser
                to our readers.
              </p>
              <PopoverClose asChild>
                <Button size="sm">I Understood!</Button>
              </PopoverClose>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid lg:grid-cols-4 lg:grid-rows-2 grid-cols-2 auto gap-6">
          <section
            className={cn(
              "row-span-2 lg:row-start-1 lg:col-start-1 lg:h-full sm:col-span-1 col-span-2",
              "h-[550px]",
              "rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50"
            )}
          >
            <AdCarousel data={tallData?.slice(0, 3)} />
          </section>
          <section
            className={cn(
              "h-60 lg:col-span-2 lg:row-start-1",
              "row-start-3 col-span-2",
              "rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50"
            )}
          >
            <AdCarousel data={wideData?.slice(0, 3)} />
          </section>
          <section
            className={cn(
              "h-60 lg:col-span-2 lg:row-start-2",
              "row-start-4 col-span-2",
              "rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50"
            )}
          >
            <AdCarousel data={wideData?.slice(3)} />
          </section>
          <section
            className={cn(
              "lg:row-span-2 lg:col-start-4 lg:h-full sm:col-span-1 col-span-2",
              "row-start-1 h-[550px]",
              "rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50"
            )}
          >
            <AdCarousel data={tallData?.slice(3)} />
          </section>
        </div>
      </div>
    </section>
  );
}
