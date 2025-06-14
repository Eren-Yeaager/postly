import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, platform, status } = await req.json();

  if (!content || !platform) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const saved = await prisma.content.create({
    data: {
      title: title || "Untitled",
      content,
      platform,
      userId,
      status: status || "DRAFT",
    },
  });

  return NextResponse.json(saved);
}
