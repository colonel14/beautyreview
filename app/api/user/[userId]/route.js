import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function PATCH(req, { params }) {
  try {
    const currentUser = await getCurrentUser();

    const currentProfile = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    const body = await req.json();

    const { name, email, image, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (!password) {
      return new NextResponse("Password is required", { status: 400 });
    }

    // Check User existion
    if (email != currentProfile.email) {
      const isEmailExists = await prismadb.user.findUnique({
        where: {
          email,
        },
      });

      if (isEmailExists) {
        return new NextResponse("Email Already Exists", { status: 403 });
      }
    }

    const user = await prismadb.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name,
        email,
        hashedPassword,
        image,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const user = await prismadb.user.delete({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
