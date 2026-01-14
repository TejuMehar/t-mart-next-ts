import connectDB from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json({
        message: "Email Already Exist",
        status: 400,
      });
    }

    if (password.length < 6) {
      return NextResponse.json({
        message: "Password Must be 6 Character",
        status: 400,
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashpassword,
    });

    return NextResponse.json({
      user,
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: `register err ${err} `,
      status: 400,
    });
  }
}
