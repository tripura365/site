"use client";

export default function WaShare({
  url,
  title,
  children,
}: {
  url: string;
  title: string;
  children: React.ReactNode;
}) {
  const handleShare = () => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(
      title + " " + url
    )}`;
    window.open(shareUrl, "_blank");
  };

  return <div onClick={handleShare}>{children}</div>;
}
