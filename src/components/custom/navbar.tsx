import Link from "next/link";
import Logo from "./logo";
import Timer from "./timer";
import Weather from "./weather";
import { Galada } from "next/font/google";
import { cn } from "@/lib/utils";

const galanda = Galada({ subsets: ["latin"], weight: ["400"] });

function EventBadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("size-16", className)} {...props}>
      <img
        src={"https://d2ros3ibvdm942.cloudfront.net/tripura365/event.jpeg"}
        alt="Event"
        className="size-full rounded-full border-4 border-white shadow-lg object-cover"
      />
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="shrink-0 flex items-center relative">
            <Link href={"/"} className="group relative z-10">
              <Logo className="transition-transform duration-300 group-hover:scale-105" />
            </Link>
            <div
              className={cn(
                "bg-red-600 text-white text-sm font-semibold h-fit my-auto px-2 py-0.5 rounded-full animate-pulse",
                "absolute left-14 whitespace-nowrap",
              )}
            >
              Test Run
            </div>
          </div>

          {/* Center: Title */}
          <div className="flex-1 flex justify-center items-end md:gap-8 pointer-events-none relative">
            <Link href={"/"} className="pointer-events-auto">
              <h1
                className={cn(
                  "text-3xl md:text-5xl font-bold text-red-700 whitespace-nowrap tracking-tight hover:scale-105 transition-transform duration-300 cursor-pointer drop-shadow-sm",
                  galanda.className,
                )}
              >
                ত্রিপুরা ৩৬৫
              </h1>
            </Link>
            <EventBadge className="hidden md:block" />
          </div>

          {/* Right: Utilities */}
          <div className="hidden md:flex items-center gap-4 z-10">
            <div className="bg-gray-100/80 px-4 py-2 rounded-full border border-gray-200 flex items-center gap-4 text-sm font-medium text-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300">
              <Timer />
              <div className="h-4 w-px bg-gray-300" />
              <Weather />
            </div>
          </div>
          <EventBadge className="block md:hidden" />

          {/* Mobile Spacer to keep title centered if utilities are hidden */}
          {/* <div className="md:hidden w-16" /> */}
        </div>
      </div>
    </nav>
  );
}
