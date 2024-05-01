"use client";
import Header from "@/components/Header";
import LoadingIndicator from "@/components/LoadingIndicator";
import Link from "next/link";
import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { LogInWithGoogle } from "@/utils/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const [signingIn, setSigningIn] = useState(false);
  const [signingInWithGoogle, setSigningInWithGoogle] = useState(false);
  const router = useRouter();

  const clickSignInWithGoogle = async () => {
    setSigningInWithGoogle(true);
    const res = await LogInWithGoogle();
    setSigningInWithGoogle(false);
    if (res.result === "error") {
      toast.error(res.message || "Something went wrong. Try again later!")
    } else {
      toast.success("Logined in successfully!");
      router.push("/dashboard");
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-[85vh] flex items-center justify-center py-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSigningIn(true);
            setTimeout(() => {
              setSigningIn(false);
            }, 3000);
          }}
          className="flex flex-col gap-y-5 w-full max-w-none sm:max-w-lg rounded-xl px-6 sm:px-8 py-6 sm:py-12 shadow-none sm:shadow-md border-0 sm:border border-black/10 dark:border-white/10 shadow-black/5 dark:shadow-white/5"
        >
          <h1 className="text-2xl font-bold text-center text-black dark:text-white">
            Login
          </h1>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full bg-transparent py-2 px-5 rounded-full border border-black dark:border-white text-lg text-black dark:text-white outline-none"
            placeholder="Email"
            required
          />
          <div>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full bg-transparent py-2 px-5 rounded-full border border-black dark:border-white text-lg text-black dark:text-white outline-none"
              placeholder="Password"
              required
            />
            <p className="mt-1 text-right text-xs text-black dark:text-white underline underline-offset-4">
              <Link href="/reset-password">Forgot Password?</Link>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-light-primary dark:bg-dark-primary py-2 px-5 rounded-full text-lg font-semibold text-light-bg dark:text-dark-bg outline-none cursor-pointer hover:backdrop-brightness-50 disabled:cursor-not-allowed"
            disabled={signingIn || signingInWithGoogle || true}
          >
            {signingIn ? (
              <LoadingIndicator
                text="Signing In"
                showText
                loaderClassNames="w-6 h-6 border-t-white dark:border-t-black"
              />
            ) : (
              "Sign In"
            )}
          </button>
          <p className="text-center text-sm text-black/70 dark:text-white/70">
            OR
          </p>
          <button
            className="flex items-center justify-center gap-x-3 w-full bg-light-primary/20 dark:bg-dark-primary/20 py-2 px-5 rounded-full text-lg text-black dark:text-white outline-none cursor-pointer hover:backdrop-brightness-75 disabled:cursor-not-allowed disabled:backdrop-brightness-75"
            type="button"
            disabled={signingInWithGoogle || signingIn}
            onClick={() => {
              clickSignInWithGoogle();
            }}
          >
            {signingInWithGoogle ? (
              <LoadingIndicator
                text="Signing In"
                showText
                loaderClassNames="w-6 h-6 border-t-black dark:border-t-white"
              />
            ) : (
              <>
                <BsGoogle className="text-2xl" />
                Login With Google
              </>
            )}
          </button>

          <p className="text-center text-base text-black dark:text-white">
            Didn&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 font-semibold"
            >
              Register Here
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
