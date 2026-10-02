import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import xss from "xss";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return xss(html);
}

export function stripHtml(html: string): string {
  if (!html) return "";
  const clean = html.replace(/<[^>]*>/g, "");
  return clean
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export function getViews({
  published_on,
  seed,
}: {
  published_on: string;
  seed: string;
}) {
  const current = new Date();
  const published = new Date(published_on);
  let viewFactor = Math.floor(
    (current.getTime() - published.getTime()) / (1000 * 60 * 60),
  );

  const seed_len = (seed.length - seed.replaceAll(" ", "").length) * 10;

  viewFactor =
    viewFactor > 1000
      ? 1000 + Math.floor(viewFactor / seed_len)
      : viewFactor > 200
        ? 500 + Math.floor(viewFactor / seed_len)
        : viewFactor;

  return viewFactor;
}

export async function catchError<T>(
  promise: Promise<[undefined, T] | [Error, undefined]>,
) {
  try {
    return [undefined, await promise] as [undefined, T];
  } catch (error) {
    return [error, undefined] as [Error, undefined];
  }
}

export function createEmptyDataInstance<D>(data: D): { data: D } {
  return { data };
}

export async function retry<T>(
  promiseFactory: () => Promise<[undefined, T] | [Error, undefined]>,
  options: { helperText?: string; retriesCount: number } = { retriesCount: 3 },
) {
  let retires_local_count = options.retriesCount;
  while (retires_local_count > 0) {
    const [err, res] = await catchError(promiseFactory());
    if (!err) return res!;
    retires_local_count--;
    retires_local_count &&
      console.log(
        `Retrying ${retires_local_count} of ${options.retriesCount} ${
          options?.helperText ?? ""
        }`,
      );
  }
  console.log(`Failed attempt ${options?.helperText ?? ""}`);
  throw new Error("Retry Limit Exceeded");
}

export function getYtThumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

export function getValue(obj: any, path: string) {
  const elements = path.split(".");
  return elements.reduce((acc, curr) => {
    if (acc === null || acc === undefined) return undefined;
    // console.log(`Accessing property '${curr}' of`, acc);
    return acc[curr];
  }, obj);
}

export function generateRandomString(length: number): string {
  return crypto.randomBytes(length).toString("hex");
}
