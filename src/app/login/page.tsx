"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttondisabled, setButtondisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onlogin = async () => {
    if (
      [user.email, user.password].some(
        (field) => field.trim() === ""
      )
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("login Failed");
      toast.error(error.message);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtondisabled(false);
    } else {
      setButtondisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "login"}</h1>
      <hr />
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
        onClick={onlogin}
        className={`p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-slate-700 ${buttondisabled ? 'cursor-not-allowed opacity-55' : ''}`}
        disabled={buttondisabled}
      >
        {buttondisabled ? "Please fill the form" : "login"}
      </button>
      <Link href="/signup" className="text-blue-500">Signup</Link>
    </div>
  );
}

export default LoginPage;
