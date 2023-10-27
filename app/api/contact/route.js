import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { mailOptions, transporter } from "@/config/nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!message) {
      return new NextResponse("Message is required", { status: 400 });
    }

    const contact = await prismadb.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json(contact);

    // if (contact) {
    //   try {
    //     await transporter.sendMail({
    //       ...mailOptions,
    //       to: process.env.EMAIL,
    //       subject: data.subject,
    //       text: `<h3>From: ${data.message}</h3>`,
    //       html: `<h3>From: ${data.from}</h3> <p>${data.message}</p>`,
    //     });

    //     return res.status(200).json({ success: true });
    //   } catch (error) {
    //     console.log(error);
    //     return res.status(400).json({ message: error.message });
    //   }
    // }
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
