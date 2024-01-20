import prismadb from "@/lib/prismadb";
import AdsClient from "./_components/_AdsClient";

export const dynamic = "force-dynamic";

async function AdsPage() {
  const ads = await prismadb.ad.findMany();

  const formattedAds = ads.map((item) => ({
    id: item.id,
    owner: item.adOwner,
    url: item.adUrl,
    banner: item.banner,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AdsClient data={formattedAds} />
      </div>
    </div>
  );
}

export default AdsPage;
