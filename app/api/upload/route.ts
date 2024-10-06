import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    const fileName = (body.file as File).name;
    const filePath = path.resolve(UPLOAD_DIR, fileName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      name: fileName,
    });
  } else {
    return NextResponse.json({
      success: false,
    });
  }
};
