import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(req) {
  try {
    const products = await prismadb.product.findMany({
      take: 4,
      include: {
        images: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const {
      title,
      images,
      price,
      skinType,
      skinConcern,
      description,
      categoryId,
    } = body;

    // If user is not exists
    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!skinType) {
      return new NextResponse("Skin Type is required", { status: 400 });
    }
    if (!skinConcern) {
      return new NextResponse("Skin Concern is required", { status: 400 });
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    // Query to database to create new product
    const product = await prismadb.product.create({
      data: {
        title,
        price,
        skinType,
        skinConcern,
        userId: currentUser.id,
        description,
        categoryId,
        images: {
          createMany: {
            data: [...images.map((image) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
