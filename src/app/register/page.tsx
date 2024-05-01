"use client";
import Header from "@/components/Header";
import LoadingIndicator from "@/components/LoadingIndicator";
import Link from "next/link";
import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";

export default function Register() {
  const [registering, setRegistering] = useState(false);
  const [registeringWithGoogle, setRegisteringWithGoogle] = useState(false);

  return (
    <>
      <Header />
      <main className="min-h-[85vh] flex items-center justify-center py-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setRegistering(true);
            setTimeout(() => {
              setRegistering(false);
            }, 3000);
          }}
          className="flex flex-col gap-y-5 w-full max-w-none sm:max-w-lg rounded-xl px-6 sm:px-8 py-6 sm:py-12 shadow-none sm:shadow-md border-0 sm:border border-black/10 dark:border-white/10 shadow-black/5 dark:shadow-white/5"
        >
          <h1 className="text-2xl font-bold text-center text-black dark:text-white">
            Register
          </h1>
          <input
            type="text"
            name="fullname"
            id="fullname"
            className="w-full bg-transparent py-2 px-5 rounded-full border border-black dark:border-white text-lg text-black dark:text-white outline-none"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            className="w-full bg-transparent py-2 px-5 rounded-full border border-black dark:border-white text-lg text-black dark:text-white outline-none"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            className="w-full bg-transparent py-2 px-5 rounded-full border border-black dark:border-white text-lg text-black dark:text-white outline-none"
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="w-full bg-transparent py-2 px-5 rounded-full border border-black dark:border-white text-lg text-black dark:text-white outline-none"
            placeholder="Confirm Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-light-primary dark:bg-dark-primary py-2 px-5 rounded-full text-lg font-semibold text-light-bg dark:text-dark-bg outline-none cursor-pointer hover:backdrop-brightness-50 disabled:cursor-not-allowed"
            disabled={registering || registeringWithGoogle || true}
          >
            {registering ? (
              <LoadingIndicator
                text="Registering"
                showText
                loaderClassNames="w-6 h-6 border-t-white dark:border-t-black"
              />
            ) : (
              "Register"
            )}
          </button>
          <p className="text-center text-sm text-black/70 dark:text-white/70">
            OR
          </p>
          <button
            className="flex items-center justify-center gap-x-3 w-full bg-light-primary/20 dark:bg-dark-primary/20 py-2 px-5 rounded-full text-lg text-black dark:text-white outline-none cursor-pointer hover:backdrop-brightness-75 disabled:cursor-not-allowed disabled:backdrop-brightness-75"
            type="button"
            disabled={registeringWithGoogle || registering || true}
            onClick={() => {
              setRegisteringWithGoogle(true);
              setTimeout(() => {
                setRegisteringWithGoogle(false);
              }, 3000);
            }}
          >
            {registeringWithGoogle ? (
              <LoadingIndicator
                text="Registering"
                showText
                loaderClassNames="w-6 h-6 border-t-black dark:border-t-white"
              />
            ) : (
              <>
                <BsGoogle className="text-2xl" />
                Register With Google
              </>
            )}
          </button>

          <p className="text-center text-base text-black dark:text-white">
            Already have an account?{" "}
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
