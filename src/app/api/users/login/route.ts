import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // console.log(reqBody);

    //validation
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exit" },
        { status: 400 }
      );
    }
    // console.log("User exits");

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "check your credential" }, //credential means check the password is right or wrong
        { status: 400 }
      );
    }

    const tokenData = {  //data is also called as payload.
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Logged In success",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true, //user does not manuplate the token only server can manuplate it.
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
