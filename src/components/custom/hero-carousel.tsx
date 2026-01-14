"use client";

import { Data, ImageItem } from "@/types/response";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroCarousel({ data: slides }: { data: ImageItem[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    if (mouseOver) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, mouseOver]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="relative h-96 md:h-125 overflow-hidden bg-gray-900 rounded-lg"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {slides?.map((slide, index) => (
        // <Link href={`/news/${slides[currentSlide].id}`} key={slide.id}>
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-full">
            {slide && (
              <Image
                src={slide.secure_url}
                alt={slide.caption}
                className="size-full object-cover"
                width={800}
                height={500}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h2 className="text-base md:text-lg font-bold text-white mb-3 leading-tight">
              {slide.caption}
            </h2>

            {/* <p className="text-gray-200 text-base md:text-lg max-w-3xl line-clamp-3">
                {slide.body}
              </p> */}
          </div>
        </div>
        // </Link>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
