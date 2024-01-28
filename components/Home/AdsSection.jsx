import Link from "next/link";
import prismadb from "@/lib/prismadb";
import Image from "next/image";

async function AdsSection() {
  const ads = await prismadb.ad.findMany({
    take: 2,
  });

  return (
    <div className="">
      <div className="flex flex-col lg:grid lg:grid-cols-12 justify-center lg:gap-5">
        {ads.map(
          (item) =>
            item && (
              <Link
                key={item.id}
                href={item.adUrl}
                target="blank"
                className="relative aspect-[31/6] col-span-6 max-w-[930px] gallery_link my-5"
              >
                <Image
                  src={item.banner}
                  fill
                  className="object-cover rounded-lg"
                  alt="ads"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default AdsSection;
