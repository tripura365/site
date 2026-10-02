"use server";

import { sloks } from "@/constants/sloks";
import {
  catchError,
  createEmptyDataInstance,
  generateRandomString,
  retry,
} from "@/lib/utils";
import {
  Data,
  AdVideoData,
  AdBannerImageData,
  WeatherApiResponse,
  ImageItem,
  Category,
  Headline,
  ArticleFull,
  AdImage,
  AdVideo,
  ArticleCategoryBrief,
  ApiEnvelope,
  ApiEnvelopeWithPagination,
} from "@/types/response";

import { headers as nextHeaders } from "next/headers";

// New Swagger API configurations
const origin = process.env.API_BASE_URL || "https://api.patrakar.app";
const hostId = process.env.HOST_ID;

// ── Helpers ──

async function getFetchOptions(
  options: RequestInit = {},
): Promise<RequestInit> {
  const headers = new Headers(options.headers);

  headers.set("Host-Id", hostId || "");

  return { ...options, headers };
}

function mapArticleFullToData(art: ArticleFull): Data {
  const categoryMapped = art.category
    ? {
        id: art.category.id,
        name: art.category.name,
        parent: art.category.parent,
        sequence: art.category.sequence,
        sub_category: art.category.sub_category || [],
      }
    : {
        id: 0,
        name: "General",
        parent: true,
        sequence: 0,
        sub_category: [],
      };

  return {
    id: art.id,
    user_id: art.user_id || 0,
    user_full_name: art.user_full_name || "",
    title: art.title,
    body: art.body,
    published_on: art.published_on || art.created_on,
    comments: [],
    last_drafted: art.last_drafted,
    created_on: art.created_on,
    total_views: art.total_views,
    category: categoryMapped,
    published: art.published,
    images: art.images || [],
    thumbnail: art.thumbnail || "",
    videos: art.videos || [],
  };
}
// ── New Swagger Actions ──

export async function getTopNews(page: number = 1) {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [err, res] = await catchError<ApiEnvelopeWithPagination<ArticleFull>>(
    retry(() =>
      fetch(
        `${origin}/public/article?published=true&page=${page}`,
        fetchOpts,
      ).then((res) => res.json()),
    ),
  );

  if (err || !res || !res.data) return createEmptyDataInstance<Data[]>([]);

  const data = res.data.map(mapArticleFullToData);

  return {
    status: true,
    code: 200,
    message: "Success",
    data,
  };
}

export async function getLatestNews(page: number = 1) {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [err, res] = await catchError<ApiEnvelopeWithPagination<ArticleFull>>(
    retry(() =>
      fetch(
        `${origin}/public/article?published=true&page=${page}`,
        fetchOpts,
      ).then((res) => res.json()),
    ),
  );
  if (err || !res || !res.data) return createEmptyDataInstance<Data[]>([]);

  const data = res.data.map(mapArticleFullToData);

  return {
    status: true,
    code: 200,
    message: "Success",
    pagination_info: res.pagination_info,
    data,
  };
}

export async function getTrendingNews(page: number = 1) {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [err, res] = await catchError<ApiEnvelopeWithPagination<ArticleFull>>(
    retry(() =>
      fetch(
        `${origin}/public/article?published=true&page=${page}`,
        fetchOpts,
      ).then((res) => res.json()),
    ),
  );
  if (err || !res || !res.data) return createEmptyDataInstance<Data[]>([]);

  const data = res.data.map(mapArticleFullToData);

  return {
    status: true,
    code: 200,
    message: "Success",
    pagination_info: res.pagination_info,
    data,
  };
}

export async function getVideoNews(page: number = 1) {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [err, res] = await catchError<ApiEnvelopeWithPagination<ArticleFull>>(
    retry(() =>
      fetch(
        `${origin}/public/article?published=true&has_video=true&page=${page}`,
        fetchOpts,
      ).then((res) => res.json()),
    ),
  );
  if (err || !res || !res.data) return createEmptyDataInstance<Data[]>([]);

  const data = res.data.map(mapArticleFullToData);

  return {
    status: true,
    code: 200,
    message: "Success",
    pagination_info: res.pagination_info,
    data,
  };
}

export async function getAdVideos() {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [err, res] = await catchError<ApiEnvelope<AdVideo[]>>(
    retry(() =>
      fetch(`${origin}/public/ad-video`, fetchOpts).then((res) => res.json()),
    ),
  );
  if (err || !res || !res.data)
    return createEmptyDataInstance<AdVideoData[]>([]);

  return {
    status: true,
    code: 200,
    message: "Success",
    pagination_info: {
      starting_index: 1,
      ending_index: res.data.length,
      current_page: 1,
      previous_page: null,
      next_page: null,
      total_pages: 1,
      has_previous_page: false,
      has_next_page: false,
      items_per_page: res.data.length,
    },
    data: res.data.map((video) => ({
      id: video.id,
      link: video.link,
      published_on: video.published_on,
    })),
  };
}

export async function getLandscapeAdBannerImages() {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [err, res] = await catchError<ApiEnvelope<AdImage[]>>(
    retry(() =>
      fetch(`${origin}/public/ad-images`, fetchOpts).then((res) => res.json()),
    ),
  );
  if (err || !res || !res.data)
    return createEmptyDataInstance<AdBannerImageData[]>([]);

  return {
    status: true,
    code: 200,
    message: "Success",
    pagination_info: {
      starting_index: 1,
      ending_index: res.data.length,
      current_page: 1,
      previous_page: null,
      next_page: null,
      total_pages: 1,
      has_previous_page: false,
      has_next_page: false,
      items_per_page: res.data.length,
    },
    data: res.data
      .filter((img) => img.wide_image_secure_url || img.wide_image_url)
      .map((img) => ({
        id: img.id,
        last_updated: img.last_updated,
        image_url: img.wide_image_secure_url || img.wide_image_url,
        image_id: img.wide_image_id,
      })),
  };
}

export async function getPortraitAdBannerImages() {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [err, res] = await catchError<ApiEnvelope<AdImage[]>>(
    retry(() =>
      fetch(`${origin}/public/ad-images`, fetchOpts).then((res) => res.json()),
    ),
  );
  if (err || !res || !res.data)
    return createEmptyDataInstance<AdBannerImageData[]>([]);

  return {
    status: true,
    code: 200,
    message: "Success",
    pagination_info: {
      starting_index: 1,
      ending_index: res.data.length,
      current_page: 1,
      previous_page: null,
      next_page: null,
      total_pages: 1,
      has_previous_page: false,
      has_next_page: false,
      items_per_page: res.data.length,
    },
    data: res.data
      .filter((img) => img.tall_image_secure_url || img.tall_image_url)
      .map((img) => ({
        id: img.id,
        last_updated: img.last_updated,
        image_url: img.tall_image_secure_url || img.tall_image_url,
        image_id: img.tall_image_id,
      })),
  };
}

export async function getTenderAdBannerImages() {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [err, res] = await catchError<ApiEnvelope<AdImage[]>>(
    retry(() =>
      fetch(`${origin}/public/ad-images`, fetchOpts).then((res) => res.json()),
    ),
  );
  if (err || !res || !res.data)
    return createEmptyDataInstance<AdBannerImageData[]>([]);

  return {
    status: true,
    code: 200,
    message: "Success",
    pagination_info: {
      starting_index: 1,
      ending_index: res.data.length,
      current_page: 1,
      previous_page: null,
      next_page: null,
      total_pages: 1,
      has_previous_page: false,
      has_next_page: false,
      items_per_page: res.data.length,
    },
    data: res.data
      .filter(
        (img) =>
          img.tender_image_secure_url ||
          img.tender_image_url ||
          img.tender_images_secure_url,
      )
      .map((img) => ({
        id: img.id,
        last_updated: img.last_updated,
        image_url:
          img.tender_image_secure_url ||
          img.tender_image_url ||
          img.tender_images_secure_url,
        image_id: img.tender_image_id ?? generateRandomString(36),
      })),
  };
}

export async function getNewsInfo(id: string) {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [err, res] = await catchError<ApiEnvelope<ArticleFull[]>>(
    retry(
      () =>
        fetch(`${origin}/public/article?article_id=${id}`, fetchOpts).then(
          (res) => res.json(),
        ),
      { helperText: `news ${id}`, retriesCount: 3 },
    ),
  );

  if (err || !res?.data?.[0]) return null;

  return res.data[0];
}

export async function getCategoryWiseNews() {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });

  const [errCats, categoriesEnvelope] = await catchError<
    ApiEnvelope<ArticleCategoryBrief[]>
  >(
    retry(() =>
      fetch(`${origin}/public/articleCategory`, fetchOpts).then((res) =>
        res.json(),
      ),
    ),
  );

  if (errCats || !categoriesEnvelope || !categoriesEnvelope.data) {
    return createEmptyDataInstance<
      {
        id: number;
        name: string;
        articles: Data[];
      }[]
    >([]);
  }
  const categories = categoriesEnvelope.data;

  let categoryWiseData = await Promise.all(
    categories.map(async (cat) => {
      const [errArticles, articlesRes] = await catchError<
        ApiEnvelopeWithPagination<ArticleFull>
      >(
        retry(() =>
          fetch(
            `${origin}/public/article?published=true&categoryId=${cat.id}`,
            fetchOpts,
          ).then((res) => res.json()),
        ),
      );

      const fullArticles = articlesRes?.data || [];
      const articles = fullArticles.map(mapArticleFullToData);

      const mappedArticles = articles.map((art) => ({
        ...art,
        category: {
          id: cat.id,
          name: cat.name,
          parent: cat.parent,
          sequence: cat.sequence,
          sub_category: cat.sub_category || [],
        },
      }));

      return {
        id: cat.id,
        name: cat.name,
        articles: mappedArticles,
      };
    }),
  );

  categoryWiseData = categoryWiseData.filter((cat) => cat.articles.length > 0);

  return {
    status: true,
    code: 200,
    message: "Success",
    pagination_info: {
      starting_index: 1,
      ending_index: categoryWiseData.length,
      current_page: 1,
      previous_page: null,
      next_page: null,
      total_pages: 1,
      has_previous_page: false,
      has_next_page: false,
      items_per_page: categoryWiseData.length,
    },
    data: categoryWiseData,
  };
}

export async function getQuotation() {
  return {
    status: true,
    data: {
      q: "The only limit to our realization of tomorrow will be our doubts of today.",
      a: "Franklin D. Roosevelt",
      h: "",
    },
  };
}

export async function getCategoryNewsInfo(id: string, page: number = 1) {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [err, res] = await catchError<ApiEnvelopeWithPagination<ArticleFull>>(
    retry(
      () =>
        fetch(
          `${origin}/public/article?published=true&categoryId=${id}&page=${page}`,
          fetchOpts,
        ).then((res) => res.json()),
      { helperText: `category ${id}`, retriesCount: 3 },
    ),
  );
  if (err || !res || !res.data) return createEmptyDataInstance<Data[]>([]);

  const articles = res.data.map(mapArticleFullToData);
  const data = articles.map((art) => ({
    ...art,
    category:
      art.category.id === 0
        ? {
            id: parseInt(id),
            name: "",
            parent: true,
            sequence: 0,
            sub_category: [],
          }
        : art.category,
  }));

  return {
    status: true,
    code: 200,
    message: "Success",
    pagination_info: res.pagination_info,
    data,
  };
}

// ── Preserved Original Actions ──

export async function getAllCategories(): Promise<Category[]> {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [errCats, categoriesEnvelope] = await catchError<
    ApiEnvelope<ArticleCategoryBrief[]>
  >(
    retry(() =>
      fetch(`${origin}/public/articleCategory`, fetchOpts).then((res) =>
        res.json(),
      ),
    ),
  );
  if (errCats || !categoriesEnvelope || !categoriesEnvelope.data) {
    return [] as Category[];
  }
  return categoriesEnvelope.data.map((cat) => ({
    id: cat.id,
    name: cat.name,
    parent: cat.parent,
    sequence: cat.sequence,
    sub_category: cat.sub_category || [],
  }));
}

export async function getWeatherInfo(): Promise<WeatherApiResponse | null> {
  const [err, res] = await catchError<any>(
    retry(() =>
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=23.8315&longitude=91.2868&current_weather=true`,
        { next: { revalidate: 60 * 10 } },
      ).then((res) => res.json()),
    ),
  );

  if (err || !res || !res.current_weather) {
    return {
      status: true,
      data: {
        main: { temp: 28 },
      } as any,
    };
  }

  return {
    status: true,
    data: {
      main: {
        temp: res.current_weather.temperature,
      },
    } as any,
  };
}

export async function getImageGallery(): Promise<ImageItem[]> {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 10 },
  });
  const [err, res] = await catchError<ApiEnvelope<ImageItem[]>>(
    retry(() =>
      fetch(`${origin}/public/imageLibrary?page=1&limit=10`, fetchOpts).then(
        (res) => res.json(),
      ),
    ),
  );
  if (err || !res || !res.data) return [] as ImageItem[];
  return res.data;
}

export async function getHeadline(): Promise<Headline[]> {
  const fetchOpts = await getFetchOptions({
    next: { revalidate: 60 * 5 }, // 5 minutes
  });
  const [err, res] = await catchError<ApiEnvelope<Headline[]>>(
    retry(() =>
      fetch(`${origin}/public/headlines`, fetchOpts).then((res) => res.json()),
    ),
  );

  if (err || !res || !res.data) return [] as Headline[];

  const getISTDateString = (date: Date) => {
    return date.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" });
  };

  const todayStr = getISTDateString(new Date());

  const todayHeadlines = res.data.filter((hl) => {
    if (!hl.created_on) return false;
    const hlDate = new Date(hl.created_on);
    if (isNaN(hlDate.getTime())) return false;
    return getISTDateString(hlDate) === todayStr;
  });

  const result: Headline[] = [];
  todayHeadlines.forEach((hl) => {
    if (hl.content.includes("*")) {
      const parts = hl.content
        .split("*")
        .map((p) => p.trim())
        .filter(Boolean);
      parts.forEach((part, index) => {
        result.push({
          id: Number(`${hl.id}00${index}`),
          content: part,
          created_on: hl.created_on,
        });
      });
    } else {
      result.push(hl);
    }
  });

  return result;
}

export async function getSlok() {
  const len = sloks.length;
  return sloks[Math.trunc(Math.random() * len)];
}
