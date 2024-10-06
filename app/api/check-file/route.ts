import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get("name");

  if (!fileName) {
    return NextResponse.json({
      exists: false,
    });
  }

  const filePath = path.resolve(UPLOAD_DIR, fileName);
  if (fs.existsSync(filePath)) {
    return NextResponse.json({
      exists: true,
    });
  } else {
    return NextResponse.json({
      exists: false,
    });
  }
};
