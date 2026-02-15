type Pagination = {
  starting_index: number;
  ending_index: number;
  current_page: number;
  previous_page: number | null;
  next_page: number | null;
  total_pages: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  items_per_page: number;
};

type BaseApiResonseWithoutPagination = {
  status: boolean;
  code: number;
  message: string;
};

type BaseApiResonseWithPagination = BaseApiResonseWithoutPagination & {
  pagination_info: Pagination;
};

export type Data = {
  id: number;
  user_id: number;
  user_full_name: string;
  title: string;
  body: string;
  published_on: string;
  comments: any[]; // Could be typed further if comment structure is known
  last_drafted: string;
  created: string;
  total_views: number;
  category: Category;
  published: boolean;
  photos: { public_id: string; secure_urls: string }[]; // Replace with exact image structure
  thumbnail: string;
  videos: string[]; // Replace with exact video structure
};

export type OriginalData = {
  id: number;
  user_id: number;
  user_full_name: string;
  title: string;
  body: string;
  published_on: string;
  comments: any[]; // Could be typed further if comment structure is known
  last_drafted: string;
  created_on: string;
  total_views: number;
  category: Category;
  published: boolean;
  images: string[]; // Replace with exact image structure
  thumbnail: string;
  videos: string[]; // Replace with exact video structure
};

export type Category = {
  id: number;
  name: string;
  parent: boolean;
  sequence: number;
  sub_category: any[]; // define if sub-category structure is known
}; // Replace with exact category structure

export type ImageItem = {
  id: number;
  caption: string;
  public_id: string;
  secure_url: string;
  created_on: string; // e.g. "Mon, 12 Jan 2026 18:18:12 GMT"
  image_of_tripura: boolean;
};

export type AdVideoData = { id: number; link: string; published_on: string };

export type Headline = {
  id: number;
  content: string;
  created_on: string;
};

export type RawAdBannerImageData = {
  id: number;
  tall_image_id: string;
  tall_image_secure_url: string;
  wide_image_id: string;
  wide_image_secure_url: string;
  last_updated: string; // e.g. "2026-01-20 20:09:53.425561+00:00"
  site_id: number;
  tender_image_id: string | null;
  tender_image_secure_url: string | null;
};

export type AdBannerImageData = {
  id: number;
  last_updated: string;
  image_url: string;
  image_id: string;
};

export type WeatherData = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number; // unix timestamp (seconds)
  sys: Sys;
  timezone: number; // seconds from UTC
  id: number; // city id
  name: string; // city name
  cod: number; // response code
};

export type Coord = {
  lon: number;
  lat: number;
};

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number; // optional (not always present)
  grnd_level?: number; // optional
};

export type Wind = {
  speed: number;
  deg: number;
};

export type Clouds = {
  all: number;
};

export type Sys = {
  type?: number; // optional (sometimes missing)
  id?: number;
  country: string;
  sunrise: number; // unix timestamp
  sunset: number; // unix timestamp
};

export type ApiResponseHeadlinesWithPagination =
  BaseApiResonseWithPagination & {
    data: Headline[];
  };

export type ApiResponseWithoutPagination = BaseApiResonseWithoutPagination & {
  data?: Data[];
};

export type ApiResponseWithPagination = BaseApiResonseWithPagination & {
  data?: Data[];
};

export type OriginalApiResponseWithPagination = BaseApiResonseWithPagination & {
  data?: OriginalData[];
};

export type ApiResponseAdVideoWithPagination = BaseApiResonseWithPagination & {
  data?: AdVideoData[];
};

export type ApiResponseAdImageWithPagination = BaseApiResonseWithPagination & {
  data: AdBannerImageData[];
};

export type ApiResponseCategoryWiseNewsWithPagination =
  BaseApiResonseWithPagination & {
    data?: { name: string; articles: Data[] }[];
  };

export type ApiResponseQuotation = {
  status: boolean;
  data?: {
    q: string;
    a: string;
    h: string;
  };
};

export type ApiResponseCategories = BaseApiResonseWithPagination & {
  data: Category[];
};

export type WeatherApiResponse = {
  status: boolean;
  data: WeatherData;
};

export type ApiResponseImageGallery = BaseApiResonseWithPagination & {
  data: ImageItem[];
};
