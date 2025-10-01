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
  created_on: string;
  total_views: number;
  category: {
    id: number;
    name: string;
    parent: boolean;
    sequence: number;
    sub_category: any[]; // define if sub-category structure is known
  }; // Replace with exact category structure
  published: boolean;
  images: any[]; // Replace with exact image structure
  thumbnail: string;
  videos: any[]; // Replace with exact video structure
};

export type AdVideoData = { id: number; link: string; published_on: string };

export type AdBannerImageData = {
  id: number;
  last_updated: string;
  image_url: string;
  image_id: string;
};

export type ApiResponseWithoutPagination = BaseApiResonseWithoutPagination & {
  data?: Data[];
};

export type ApiResponseWithPagination = BaseApiResonseWithPagination & {
  data?: Data[];
};

export type ApiResponseAdVideoWithPagination = BaseApiResonseWithPagination & {
  data?: AdVideoData[];
};

export type ApiResponseAdImageWithPagination = BaseApiResonseWithPagination & {
  data: AdBannerImageData[];
};

export type ApiResponseCategoryWiseNewsWithPagination =
  BaseApiResonseWithPagination & {
    data?: { id: number; name: string; articles: Data[] }[];
  };

export type ApiResponseQuotation = {
  status: boolean;
  data?: {
    q: string;
    a: string;
    h: string;
  };
};
