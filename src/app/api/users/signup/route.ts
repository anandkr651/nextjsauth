import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // console.log("reqBody",reqBody);
    //reqBody { email: 'three@gmail.com', password: 'three', username: 'three' }

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    // console.log("savedUser",savedUser);
    /*savedUser {
  username: 'three',
  email: 'three@gmail.com',
  password: '$2a$10$S5CXBm/le.izd11pzSGZGOtq5Ceh/bni6du9N1fw/pmxkz2jwwuQ.',
  isverified: false,
  isAdmin: false,
  _id: new ObjectId('66b9e6327da1df401c0fd76c'),
  __v: 0
}*/

    //send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
