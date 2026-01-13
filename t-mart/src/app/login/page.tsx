"use client";

import React, { useState } from "react";
import {
  ArrowBigLeft,
  EyeIcon,
  EyeOff,
  LeafIcon,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import google from "@/assets/google.png";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const session = useSession();

  console.log(session);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        alert(res.error);
      } else {
        router.push("/"); // redirect after login
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isValid = email !== "" && password !== "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800"
      >
        <ArrowBigLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      {/* Heading */}
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-green-700 mb-2"
      >
        Welcome Back
      </motion.h1>

      <p className="text-gray-400 mb-8 flex items-center gap-2">
        Login to T-Mart <LeafIcon className="w-5 h-5 text-green-700" />
      </p>

      {/* Form */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-5 w-full max-w-sm"
      >
        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-green-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-10 focus:ring-2 focus:ring-green-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <EyeOff
              className="absolute right-3 top-3.5 w-5 h-5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeIcon
              className="absolute right-3 top-3.5 w-5 h-5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || loading}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
            ${
              isValid
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span className="flex-1 h-px bg-gray-300" />
          OR
          <span className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl font-medium"
        >
          <Image src={google} width={20} height={20} alt="Google" />
          Continue with Google
        </button>
      </motion.form>

      {/* Signup Redirect */}
      <p className="text-gray-600 mt-6 text-sm">
        Don&apos;t have an account?
        <span
          onClick={() => router.push("/register")}
          className="text-green-600 ml-1 font-medium cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default Login;
