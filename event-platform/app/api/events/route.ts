import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    // ✅ Get image file
    const file = formData.get("image") as File;
    if (!file) {
      return NextResponse.json({ message: "Image file is required" }, { status: 400 });
    }

    // ✅ Extract other fields safely
    const eventData: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key !== "image") eventData[key] = value;
    });

    // ✅ Parse tags and agenda arrays
    let tags: string[] = [];
    let agenda: string[] = [];
    try {
      tags = JSON.parse(eventData.tags || "[]");
      agenda = JSON.parse(eventData.agenda || "[]");
    } catch {
      return NextResponse.json({ message: "Invalid tags or agenda format" }, { status: 400 });
    }

    // ✅ Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Upload image to Cloudinary
    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "DevEvent", resource_type: "image" },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Upload failed"));
          resolve(result);
        }
      ).end(buffer);
    });

    // ✅ Assign image URL to event
    eventData.image = uploadResult.secure_url;

    // ✅ Create Event in DB
    const createdEvent = await Event.create({
      ...eventData,
      tags,
      agenda,
    });

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Event creation failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Event fetching failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}