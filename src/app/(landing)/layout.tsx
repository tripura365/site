export default function Layout({
  children,
  category,
  latestpost,
  topnews,
  trendingpost,
  videos,
  advideos,
  adimages,
}: {
  children: React.ReactNode;
  category: React.ReactNode;
  latestpost: React.ReactNode;
  topnews: React.ReactNode;
  trendingpost: React.ReactNode;
  videos: React.ReactNode;
  advideos: React.ReactNode;
  adimages: React.ReactNode;
}) {
  return (
    <main className="space-y-4">
      {children}
      {adimages}
      {/* {topnews} - Moved to page.tsx sidebar */}
      {latestpost}
      {trendingpost}
      {videos}
      {advideos}
      {category}
    </main>
  );
}
