import {
  ArrowBigLeft,
  EyeIcon,
  EyeOff,
  Key,
  LeafIcon,
  Loader2,
  Lock,
  LogIn,
  Mail,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { animate, motion } from "motion/react";
import Image from "next/image";
import google from "@/assets/google.png";
import axios from "axios";
import { useRouter } from "next/navigation";

type propType = {
  prevStep: (s: number) => void;
};
function RegisterForm({ prevStep }: propType) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      console.log(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      <div
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer"
        onClick={() => prevStep(1)}
      >
        <ArrowBigLeft className="w-5 h-5 " />
        <span className="font-medium">Back</span>
      </div>
      <motion.h1
        initial={{
          y: -10,
          opacity: 0,
        }}
        animate={{
          y: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="text-4xl font-extrabold text-green-700 mb-2"
      >
        Create Account
      </motion.h1>
      <p className="text-gray-400 mb-8 flex items-center gap-3">
        Join T-Mart today <LeafIcon className="w-5 h-5 text-green-700" />{" "}
      </p>

      <motion.form
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="flex flex-col gap-5 w-full max-w-sm"
        onSubmit={handleRegister}
      >
        <div className="relative">
          <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Enter Your Name "
            className="w-full border border-gray-400 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Enter Your Email "
            className="w-full border border-gray-400 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password "
            className="w-full border border-gray-400 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {showPassword ? (
            <EyeOff
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeIcon
              className="absolute right-3 top-3.5 w-5 h-5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {(() => {
          const formValidation = name !== "" && email !== "" && password !== "";
          return (
            <button
              type="submit"
              disabled={loading || !formValidation}
              className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 shadow-md 
  inline-flex items-center justify-center gap-2
  ${
    formValidation
      ? "bg-green-600 hover:bg-green-700 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Register"
              )}
            </button>
          );
        })()}

        <div className="flex items-center gap-2 text-gray-400 text-sm mt-2 ">
          <span className="flex-1 h-px bg-gray-400 "></span>
          OR <span className="flex-1 h-px bg-gray-400 "></span>
        </div>
        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200">
          <Image src={google} width={20} height={20} alt="google" />
          Continue with Google
        </button>
      </motion.form>
      <p className="text-gray-600 mt-6 text-sm flex items-center gap-2">
        Already Have an Account ? <LogIn />{" "}
        <span
          onClick={() => router.push("/login")}
          className="text-green-600 ml-1 font-medium cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default RegisterForm;
