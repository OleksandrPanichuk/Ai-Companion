import { NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary'




cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
})

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    if (!key) return new NextResponse('Key not provided', { status: 400 })


    await cloudinary.uploader.destroy(key);

    return new NextResponse('OK', { status: 200 })

  } catch (err) {
    console.log(err)
    return new NextResponse("Something went wrong", { status: 500 })
  }
}