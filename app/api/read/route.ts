import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message
	return String(error)
}

const reportError = ({ message }: { message: string }) => {
  return message
}


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let name = searchParams.get("fileName");
    const data = await fs.readFile(process.cwd() + '/app/' + name, 'utf8');
    console.log('path >> ', process.cwd() + '/app/' + name);
    console.log(data);
    return Response.json({ ok: true, results: data });
  } catch (error) {
    //https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
    reportError({ message: getErrorMessage(error) })
    return NextResponse.json({ error: `Failed to read file` }, { status: 500 });
  }
}