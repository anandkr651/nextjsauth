"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttondisabled, setButtondisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    if (
      [user.email, user.password, user.username].some(
        (field) => field.trim() === ""
      )
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      // console.log("SignUp success", response);
      /*SignUp success {config,data,headers,status,statusText}  */

      router.push("/login");
    } catch (error: any) {
      // console.log("Signup Failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtondisabled(false);
    } else {
      setButtondisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Your name</label>
      <input
        id="username"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        type="text"
        required
      />
      <label htmlFor="email">email</label>
      <input
        id="email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        type="email"
        required
      />
      <label htmlFor="password">password</label>
      <input
        id="password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="password"
        required
      />
      <button
        onClick={onSignup}
        className={`p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-slate-700 ${
          buttondisabled ? "cursor-not-allowed opacity-55" : ""
        }`}
        disabled={buttondisabled}
      >
        {buttondisabled ? "Please fill the form" : "signup"}
      </button>
      <label htmlFor="">
        if you created your account ?
        <Link href="/login" className="text-blue-500 ml-4">
          {" "}
          Login{" "}
        </Link>
      </label>
    </div>
  );
}

export default SignUpPage;
