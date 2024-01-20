import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, image, name, password, role } = body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const isEmailExists = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExists) {
      return new NextResponse("Email Already Exists", { status: 403 });
    }

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        image,
        hashedPassword,
        role,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { name, email, image, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
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
    if (email != currentUser.email) {
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
        id: currentUser.id,
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

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
