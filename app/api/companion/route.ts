import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
// import { checkSubscription } from "@/lib/subscription";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
})

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { image, name, description, instructions, seed, categoryId } = body;

    if (!user || !user.id || !user.username) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!image.src || !image.key || !name || !description || !instructions || !seed || !categoryId) {
      return new NextResponse("Missing required fields", { status: 400 });
    };

    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse("Pro subscription required", { status: 403 });
    }


    const companion = await prismadb.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.username,
        image,
        name,
        description,
        instructions,
        seed,
      }
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log("[COMPANION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};