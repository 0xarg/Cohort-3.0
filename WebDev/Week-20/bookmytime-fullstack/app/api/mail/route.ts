import { sendMail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, token } = await req.json();
  try {
    const info = await sendMail({ email, token });
    if (!info.messageId) {
      console.log("Mail req rejected, " + info.response);
      return NextResponse.json({
        error: info.response,
      });
    }
    console.log("Mail sent from server API, " + info.messageId);
    return NextResponse.json({
      message: info.messageId,
    }, {status:200});
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
};
