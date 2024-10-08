"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      // console.log(res);
      setData(res.data.data.username);
      /*data: 
      data: 
      email: "one@gmail.com"
      isAdmin: false
      isverified: false
      username: "one"
      verifyToken: "$2a$10$bk2QysBVBk7wKQkolcaAYOiAzM4o.aFnHNv/pGGhdw3yIOyTpPyy2"
      verifyTokenExpiry: "2024-08-07T09:33:50.791Z"
      __v: 0
      _id: "66b3316ea7ae1f796aa642f0" */
    } catch (error: any) {
      // console.log(error.message);
      toast.error(error.message);
    }
  };
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      // console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>click here</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className={`p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-slate-700`}
      >
        logout
      </button>
      <button
        onClick={getUserDetails}
        className={`p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-slate-700`}
      >
        get user details
      </button>
    </div>
  );
}
