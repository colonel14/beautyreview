import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  // Get data sent by the Registeration form
  const { email, name, password, role } = body;



  const checkUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (checkUser) {
    console.log('failed');
    return NextResponse.json({ error: 'User already registered with the same email' }, { status: 500 })
  }


  // Encryption for password
  const hashedPassword = await bcrypt.hash(password, 12);




  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      role,
    },
  });

  return NextResponse.json(user);
}
