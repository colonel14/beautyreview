import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function PATCH(req, { params }) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { owner, banner, url } = body;

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.adId) {
      return new NextResponse("Ad id is required", { status: 400 });
    }

    const ad = await prismadb.ad.update({
      where: {
        id: params.adId,
      },
      data: {
        adOwner: owner,
        banner,
        adUrl: url,
      },
    });

    return NextResponse.json({ ad });
  } catch (error) {
    console.log("[Ad_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.adId) {
      return new NextResponse("Ad id is required", { status: 400 });
    }

    const ad = await prismadb.ad.delete({
      where: {
        id: params.adId,
      },
    });

    return NextResponse.json(ad);
  } catch (error) {
    console.log("[Ad_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
