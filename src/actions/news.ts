"use server";

import { sloks } from "@/constants/sloks";
import { catchError, createEmptyDataInstance, retry } from "@/lib/utils";
import {
  ApiResponseAdImageWithPagination,
  ApiResponseAdVideoWithPagination,
  ApiResponseCategoryWiseNewsWithPagination,
  ApiResponseWithoutPagination,
  ApiResponseWithPagination,
  ApiResponseQuotation,
  Data,
  AdVideoData,
  AdBannerImageData,
  WeatherApiResponse,
} from "@/types/response";

// THis is the origin host URL
const origin = process.env.ORIGIN ?? "https://master-news-service.onrender.com";
const hostId = process.env.HOST_ID!;

export async function getTopNews() {
  const [err, res] = await catchError<ApiResponseWithoutPagination>(
    retry(() =>
      fetch(`${origin}/api/index_delivery?intent=latest`, {
        headers: { "Host-Id": hostId },
        next: { revalidate: 60 * 10 },
      }).then((res) => res.json())
    )
  );
  if (err) return createEmptyDataInstance<Data[]>([]);
  return res;
}

export async function getLatestNews() {
  const [err, res] = await catchError<ApiResponseWithPagination>(
    retry(() =>
      fetch(`${origin}/api/index_delivery?intent=recent`, {
        headers: { "Host-Id": hostId },
        next: { revalidate: 60 * 10 },
      }).then((res) => res.json())
    )
  );
  if (err) return createEmptyDataInstance<Data[]>([]);
  return res;
}

export async function getTrendingNews() {
  const [err, res] = await catchError<ApiResponseWithPagination>(
    retry(() =>
      fetch(`${origin}/api/index_delivery?intent=most_read`, {
        headers: { "Host-Id": hostId },
        next: { revalidate: 60 * 10 },
      }).then((res) => res.json())
    )
  );
  if (err) return createEmptyDataInstance<Data[]>([]);
  return res;
}

export async function getVideoNews() {
  const [err, res] = await catchError<ApiResponseWithPagination>(
    retry(() =>
      fetch(`${origin}/api/index_delivery?intent=recent_articles_with_videos`, {
        headers: { "Host-Id": hostId },
        next: { revalidate: 60 * 10 },
      }).then((res) => res.json())
    )
  );
  if (err) return createEmptyDataInstance<Data[]>([]);
  return res;
}

export async function getAdVideos() {
  const [err, res] = await catchError<ApiResponseAdVideoWithPagination>(
    retry(() =>
      fetch(`${origin}/api/index_delivery?intent=ad_videos`, {
        headers: { "Host-Id": hostId },
        next: { revalidate: 60 * 10 },
      }).then((res) => res.json())
    )
  );
  if (err) return createEmptyDataInstance<AdVideoData[]>([]);
  return res;
}

export async function getLandscapeAdBannerImages() {
  const [err, res] = await catchError<ApiResponseAdImageWithPagination>(
    retry(() =>
      fetch(`${origin}/api/index_delivery?intent=wide_ad_images`, {
        headers: { "Host-Id": hostId },
        next: { revalidate: 60 * 10 },
      }).then((res) => res.json())
    )
  );
  if (err) return createEmptyDataInstance<AdBannerImageData[]>([]);
  return res;
}

export async function getPortraitAdBannerImages() {
  const [err, res] = await catchError<ApiResponseAdImageWithPagination>(
    retry(() =>
      fetch(`${origin}/api/index_delivery?intent=tall_ad_images`, {
        headers: { "Host-Id": hostId },
        next: { revalidate: 60 * 10 },
      }).then((res) => res.json())
    )
  );
  if (err) return createEmptyDataInstance<AdBannerImageData[]>([]);
  return res;
}

export async function getNewsInfo(id: string) {
  const [err, res] = await catchError<Data>(
    retry(
      () =>
        fetch(`${origin}/api/article/${id}`, {
          headers: { "Host-Id": hostId },
          next: { revalidate: 60 * 10 },
        }).then((res) => res.json()),
      { helperText: `news ${id}`, retriesCount: 3 }
    )
  );
  if (err) return null;
  return res;
}

export async function getCategoryWiseNews() {
  const [err, res] =
    await catchError<ApiResponseCategoryWiseNewsWithPagination>(
      retry(() =>
        fetch(`${origin}/api/index_delivery?intent=category_wise_news`, {
          headers: { "Host-Id": hostId },
          next: { revalidate: 60 * 10 },
        }).then((res) => res.json())
      )
    );
  if (err)
    return createEmptyDataInstance<
      {
        id: number;
        name: string;
        articles: Data[];
      }[]
    >([]);
  return res;
}

export async function getQuotation() {
  const [err, res] = await catchError<ApiResponseQuotation>(
    retry(() =>
      fetch(`${origin}/api/cosmetic_data?intent=quote`, {
        headers: { "Host-Id": hostId },
        next: { revalidate: 60 * 10 },
      }).then((res) => res.json())
    )
  );
  if (err)
    return createEmptyDataInstance<{
      q: string;
      a: string;
      h: string;
    } | null>(null);
  return res;
}

export async function getCategoryNewsInfo(id: string) {
  const [err, res] = await catchError<ApiResponseWithPagination>(
    retry(
      () =>
        fetch(`${origin}/api/category/${id}`, {
          headers: { "Host-Id": hostId },
          next: { revalidate: 60 * 10 },
        }).then((res) => res.json()),
      { helperText: `category ${id}`, retriesCount: 3 }
    )
  );
  if (err) return createEmptyDataInstance<Data[]>([]);
  return res;
}

export async function getWeatherInfo() {
  const [err, res] = await catchError<WeatherApiResponse>(
    retry(
      () =>
        fetch(`${origin}/api/cosmetic_data?intent=weather`, {
          headers: { "Host-Id": hostId },
          next: { revalidate: 60 * 10 },
        }).then((res) => res.json()),
      { helperText: `headline`, retriesCount: 3 }
    )
  );

  if (err) return null;
  return res;
}

export async function getSlok() {
  const len = sloks.length;
  return sloks[Math.trunc(Math.random() * len)];
}
