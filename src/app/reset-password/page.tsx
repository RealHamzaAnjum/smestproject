"use client";
import Header from "@/components/Header";
import LoadingIndicator from "@/components/LoadingIndicator";
import Link from "next/link";
import React, { useState } from "react";

export default function ResetPassword() {
  const [reseting, setReseting] = useState(false);

  return (
    <>
      <Header />
      <main className="min-h-[85vh] flex items-center justify-center py-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setReseting(true);
            setTimeout(() => {
              setReseting(false);
            }, 3000);
          }}
          className="flex flex-col gap-y-5 w-full max-w-none sm:max-w-lg rounded-xl px-6 sm:px-8 py-6 sm:py-12 shadow-none sm:shadow-md border-0 sm:border border-black/10 dark:border-white/10 shadow-black/5 dark:shadow-white/5"
        >
          <h1 className="text-2xl font-bold text-center text-black dark:text-white">
            Reset Password
          </h1>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full bg-transparent py-2 px-5 rounded-full border border-black dark:border-white text-lg text-black dark:text-white outline-none"
            placeholder="Email"
            required
          />

          <button
            type="submit"
            className="w-full bg-light-primary dark:bg-dark-primary py-2 px-5 rounded-full text-lg font-semibold text-light-bg dark:text-dark-bg outline-none cursor-pointer hover:backdrop-brightness-50 disabled:cursor-not-allowed"
            disabled={reseting || true}
          >
            {reseting ? (
              <LoadingIndicator
                text="Resetting"
                showText
                loaderClassNames="w-6 h-6 border-t-white dark:border-t-black"
              />
            ) : (
              "Reset"
            )}
          </button>

          <p className="text-center text-base text-black dark:text-white">
            <Link
              href="/login"
              className="underline underline-offset-4 font-semibold"
            >
              Login Here
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}
