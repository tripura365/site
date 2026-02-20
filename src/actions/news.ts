"use server";

import { INTENT } from "@/constants/intent";
import { sloks } from "@/constants/sloks";
import {
  catchError,
  createEmptyDataInstance,
  getValue,
  retry,
} from "@/lib/utils";
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
  ApiResponseImageGallery,
  ImageItem,
  ApiResponseCategories,
  Category,
  ApiResponseHeadlinesWithPagination,
  Headline,
  RawAdBannerImageData,
  OriginalData,
  OriginalApiResponseWithPagination,
} from "@/types/response";
import { format } from "date-fns";

// THis is the origin host URL
const origin = process.env.ORIGIN ?? "https://master-news-service.onrender.com";
const hostId = process.env.HOST_ID!;
const adminUrl = "https://patrakar.app";
const adminJwt = process.env.ADMIN_JWT;
const lambdaUrl = `https://75kowpjykl.execute-api.ap-south-1.amazonaws.com/api/updatenewstocache?website_id=${process.env.HOST_ID}`;

async function getFullInfo(
  locator: (typeof INTENT)[keyof typeof INTENT]["locator"],
) {
  const [err, res] = await catchError<any>(
    retry(() =>
      fetch(lambdaUrl, {
        next: { revalidate: 60 * 10 },
      }).then((res) => res.json()),
    ),
  );
  if (err) throw new Error("Failed to fetch data from lambda");
  const extractedRes = getValue(res.results, locator);

  return extractedRes;
}

export async function getTopNews() {
  // pulling from lambda instead of origin because it is faster and more reliable as it is hosted on AWS.
  const [err, res] = await catchError<Data[]>(
    getFullInfo(INTENT.LATEST.locator),
  );
  if (!res) return [] as Data[];
  return res;

  // const [err, res] = await catchError<ApiResponseWithoutPagination>(
  //   retry(() =>
  //     fetch(`${origin}/api/index_delivery?intent=latest`, {
  //       headers: { "Host-Id": hostId },
  //       next: { revalidate: 60 * 10 },
  //     }).then((res) => res.json()),
  //   ),
  // );
  // if (err) return createEmptyDataInstance<Data[]>([]);
  // return res;
}

export async function getLatestNews() {
  // pulling from lambda instead of origin because it is faster and more reliable as it is hosted on AWS.
  const [err, res] = await catchError<Data[]>(
    getFullInfo(INTENT.RECENT.locator),
  );
  if (!res) return [] as Data[];
  return res;

  // const [err, res] = await catchError<ApiResponseWithPagination>(
  //   retry(() =>
  //     fetch(`${origin}/api/index_delivery?intent=recent`, {
  //       headers: { "Host-Id": hostId },
  //       next: { revalidate: 60 * 10 },
  //     }).then((res) => res.json()),
  //   ),
  // );
  // if (err) return createEmptyDataInstance<Data[]>([]);
  // return res;
}

export async function getTrendingNews() {
  // pulling from lambda instead of origin because it is faster and more reliable as it is hosted on AWS.
  const [err, res] = await catchError<Data[]>(
    getFullInfo(INTENT.MOST_READ.locator),
  );
  if (!res) return [] as Data[];
  return res;

  // const [err, res] = await catchError<ApiResponseWithPagination>(
  //   retry(() =>
  //     fetch(`${origin}/api/index_delivery?intent=most_read`, {
  //       headers: { "Host-Id": hostId },
  //       next: { revalidate: 60 * 10 },
  //     }).then((res) => res.json()),
  //   ),
  // );
  // if (err) return createEmptyDataInstance<Data[]>([]);
  // return res;
}

export async function getAllCategories() {
  // pulling from lambda instead of origin because it is faster and more reliable as it is hosted on AWS.
  const [err, res] = await catchError<Category[]>(
    getFullInfo(INTENT.ALL_CATEGORIES.locator),
  );
  if (!res) return [] as Category[];
  return res;

  // const [err, res] = await catchError<ApiResponseCategories>(
  //   retry(() =>
  //     fetch(`${origin}/api/index_delivery?intent=all_categories`, {
  //       headers: { "Host-Id": hostId },
  //       next: { revalidate: 60 * 10 },
  //     }).then((res) => res.json()),
  //   ),
  // );
  // if (err) return createEmptyDataInstance<Category[]>([]);
  // return res;
}

export async function getVideoNews() {
  // pulling from lambda instead of origin because it is faster and more reliable as it is hosted on AWS.
  const [err, res] = await catchError<Data[]>(
    getFullInfo(INTENT.RECENT_ARTICLES_WITH_VIDEOS.locator),
  );
  if (!res) return [] as Data[];
  return res;

  // const [err, res] = await catchError<ApiResponseWithPagination>(
  //   retry(() =>
  //     fetch(`${origin}/api/index_delivery?intent=recent_articles_with_videos`, {
  //       headers: { "Host-Id": hostId },
  //       next: { revalidate: 60 * 10 },
  //     }).then((res) => res.json()),
  //   ),
  // );
  // if (err) return createEmptyDataInstance<Data[]>([]);
  // return res;
}

export async function getAdVideos() {
  // pulling from lambda instead of origin because it is faster and more reliable as it is hosted on AWS.
  const [err, res] = await catchError<AdVideoData[]>(
    getFullInfo(INTENT.AD_VIDEOS.locator),
  );
  if (!res) return [] as AdVideoData[];
  return res;

  // const [err, res] = await catchError<ApiResponseAdVideoWithPagination>(
  //   retry(() =>
  //     fetch(`${origin}/api/index_delivery?intent=ad_videos`, {
  //       headers: { "Host-Id": hostId },
  //       next: { revalidate: 60 * 10 },
  //     }).then((res) => res.json()),
  //   ),
  // );
  // if (err) return createEmptyDataInstance<AdVideoData[]>([]);
  // return res;
}

export async function getLandscapeAdBannerImages() {
  // pulling from lambda instead of origin because it is faster and more reliable as it is hosted on AWS.
  const [err, res] = await catchError<RawAdBannerImageData[]>(
    getFullInfo(INTENT.WIDE_AD_IMAGES.locator),
  );
  if (!res) return [] as AdBannerImageData[];
  return res.map((it) => ({
    id: it.id,
    image_url: it.wide_image_secure_url,
    image_id: it.wide_image_id,
    last_updated: it.last_updated,
  })) as AdBannerImageData[];

  // const [err, res] = await catchError<ApiResponseAdImageWithPagination>(
  //   retry(() =>
  //     fetch(`${origin}/api/index_delivery?intent=wide_ad_images`, {
  //       headers: { "Host-Id": hostId },
  //       next: { revalidate: 60 * 10 },
  //     }).then((res) => res.json()),
  //   ),
  // );
  // if (err) return createEmptyDataInstance<AdBannerImageData[]>([]);
  // return res;
}

export async function getPortraitAdBannerImages() {
  // pulling from lambda instead of origin because it is faster and more reliable as it is hosted on AWS.
  const [err, res] = await catchError<RawAdBannerImageData[]>(
    getFullInfo(INTENT.TALL_AD_IMAGES.locator),
  );
  if (!res) return [] as AdBannerImageData[];
  return res.map((it) => ({
    id: it.id,
    image_url: it.tall_image_secure_url,
    image_id: it.tall_image_id,
    last_updated: it.last_updated,
  })) as AdBannerImageData[];
  // const [err, res] = await catchError<ApiResponseAdImageWithPagination>(
  //   retry(() =>
  //     fetch(`${origin}/api/index_delivery?intent=tall_ad_images`, {
  //       headers: { "Host-Id": hostId },
  //       next: { revalidate: 60 * 10 },
  //     }).then((res) => res.json()),
  //   ),
  // );
  // if (err) return createEmptyDataInstance<AdBannerImageData[]>([]);
  // return res;
}

export async function getNewsInfo(id: string) {
  const [err, res] = await catchError<OriginalData>(
    retry(
      () =>
        fetch(`${origin}/api/article/${id}`, {
          headers: { "Host-Id": hostId },
          next: { revalidate: 60 * 10 },
        }).then((res) => res.json()),
      { helperText: `news ${id}`, retriesCount: 3 },
    ),
  );
  if (err) return null;
  return res;
}

type CategoryWiseNews = Record<string, Data[]>;
export async function getCategoryWiseNews() {
  // pulling from lambda instead of origin because it is faster and more reliable as it is hosted on AWS.
  const [err, res] = await catchError<CategoryWiseNews>(
    getFullInfo(INTENT.CATEGORY_WISE_NEWS.locator),
  );
  if (!res)
    return [] as {
      name: string;
      articles: Data[];
    }[];

  const formattedRes = Object.entries(res).map(([name, articles]) => ({
    name,
    articles,
  }));

  return formattedRes;

  // const [err, res] =
  //   await catchError<ApiResponseCategoryWiseNewsWithPagination>(
  //     retry(() =>
  //       fetch(`${origin}/api/index_delivery?intent=category_wise_news`, {
  //         headers: { "Host-Id": hostId },
  //         next: { revalidate: 60 * 10 },
  //       }).then((res) => res.json()),
  //     ),
  //   );
  // if (err)
  //   return createEmptyDataInstance<
  //     {
  //       name: string;
  //       articles: Data[];
  //     }[]
  //   >([]);
  // return res;
}

export async function getQuotation() {
  const [err, res] = await catchError<ApiResponseQuotation>(
    retry(() =>
      fetch(`${origin}/api/cosmetic_data?intent=quote`, {
        headers: { "Host-Id": hostId },
        next: { revalidate: 60 * 10 },
      }).then((res) => res.json()),
    ),
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
  const [err, res] = await catchError<OriginalApiResponseWithPagination>(
    retry(
      () =>
        fetch(`${origin}/api/category/${id}`, {
          headers: { "Host-Id": hostId },
          next: { revalidate: 60 * 10 },
        }).then((res) => res.json()),
      { helperText: `category ${id}`, retriesCount: 3 },
    ),
  );
  if (err) return createEmptyDataInstance<OriginalData[]>([]);
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
      { helperText: `headline`, retriesCount: 3 },
    ),
  );

  if (err) return null;
  return res;
}

export async function getImageGallery() {
  // pulling from lambda instead of origin because it is faster and more reliable as it is hosted on AWS.
  const [err, res] = await catchError<ImageItem[]>(
    getFullInfo(INTENT.IMAGE_GALLERY.locator),
  );
  // console.log("Image Gallery Response:", { err, res });
  if (!res) return [] as ImageItem[];
  return res;
  // const [err, res] = await catchError<ApiResponseImageGallery>(
  //   retry(() =>
  //     fetch(`${origin}/api/index_delivery?intent=image_gallary`, {
  //       headers: { "Host-Id": hostId },
  //       next: { revalidate: 60 * 10 },
  //     }).then((res) => res.json()),
  //   ),
  // );
  // if (err) return createEmptyDataInstance<ImageItem[]>([]);
  // return res;
}

export async function getHeadline() {
  // const [err, res] = await catchError<ApiResponseHeadlinesWithPagination>(
  //   retry(() =>
  //     fetch(`${origin}/api/index_delivery?intent=headlines`, {
  //       headers: { "Host-Id": hostId },
  //       next: { revalidate: 60 },
  //     }).then((res) => res.json()),
  //   ),
  // );

  // console.log(res?.data);
  const [err, res] = await catchError<Headline[]>(
    getFullInfo(INTENT.HEADLINES.locator),
  );

  // console.log("Headlines Response:", { err, res });

  if (err) return [] as Headline[];

  const data = res?.filter(
    (h) => format(h.created_on, "PP") === format(new Date(), "PP"),
  );

  // console.log(data);

  return data;
}

export async function getSlok() {
  const len = sloks.length;
  return sloks[Math.trunc(Math.random() * len)];
}
