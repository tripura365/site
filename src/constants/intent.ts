export const INTENT = {
  LATEST: {
    value: "latest",
    locator: "article.latest_articles",
  },
  RECENT: {
    value: "recent",
    locator: "article.last_recorded_news",
  },
  MOST_READ: {
    value: "most_read",
    locator: "article.most_read_news",
  },
  ALL_CATEGORIES: {
    value: "all_categories",
    locator: "category.categories",
  },
  RECENT_ARTICLES_WITH_VIDEOS: {
    value: "recent_articles_with_videos",
    locator: "article.recent_articles_with_videos",
  },
  AD_VIDEOS: {
    value: "ad_videos",
    locator: "ads.videos",
  },
  WIDE_AD_IMAGES: {
    value: "wide_ad_images",
    locator: "ads.wide_ad_images",
  },
  TALL_AD_IMAGES: {
    value: "tall_ad_images",
    locator: "ads.tall_ad_images",
  },
  CATEGORY_WISE_NEWS: {
    value: "category_wise_news",
    locator: "category.category_wise_news",
  },
  IMAGE_GALLERY: {
    value: "image_gallery",
    locator: "multimedia.image_gallary",
  },
  VIDEO_GALLERY: {
    value: "video_gallery",
    locator: "multimedia.video_gallary",
  },
  HEADLINES: {
    value: "headline",
    locator: "headlines",
  },
} as const;
