import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const reqName = data.name;
  const reqPass = data.password;
  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      {
        message: "Please provide ENV JWT_SECERT",
      },
      { status: 403 }
    );
  }

  if (reqName !== "anurag" || reqPass !== 123) {
    return NextResponse.json(
      {
        message: "Wrong creds,",
      },
      { status: 401 }
    );
  }

  const token = jwt.sign(data, process.env.JWT_SECRET);

  return NextResponse.json(
    {
      token,
    },
    { status: 200 }
  );
}
