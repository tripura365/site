import Image, { ImageProps } from "next/image";
import logo from "@/../public/logo.png";
import { cn } from "@/lib/utils";

export default function Logo({ className, ...props }: Partial<ImageProps>) {
  return (
    <div className="relative size-16">
      <Image
      {...props}
      src={logo}
      alt="tripura-365-logo"
      height={50}
      width={100}
      className={cn("h-16 w-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30", className)}
    />
    <div className="size-10 rounded-full bg-white absolute bottom-0 left-1/2 -translate-x-1/2" />
    </div>
  );
}
