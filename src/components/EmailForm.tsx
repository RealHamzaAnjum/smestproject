"use client";
import { AddNewSubscriber } from "@/utils/firebase";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function EmailForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = async () => {
    setIsSubmitting(true);
    const res = await AddNewSubscriber(email);
    if (res.result === "success") {
      setSubscribed(true);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      toast.error(res.message || 'Something went wrong. Try Again later')
    }
  }

  return (
    <div className={`sign-up-container ${subscribed ? "submitted" : ""}`}>
      <div className="envelope">
        <div className="paper">
          <h2 className="text-xl font-medium mb-4">Subscribe to our Newslatter</h2>
          <form
            className="sign-up-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) {
                subscribe();
              }
            }}
          >
            <input
              type="email"
              placeholder="Email"
              className="text-input text-base px-4"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button type="submit" className="button text-base disabled:cursor-not-allowed disabled:bg-[#3a3a3a] disabled:hover:bg-[#3a3a3a] disabled:text-white"
              disabled={isSubmitting}
            >

              {isSubmitting ? "Subscribing ..." : "Subscribe"}
            </button>
          </form>
        </div>
        <div className="bottom-flap"></div>
      </div>
      <div className="thanks-text text-xl text-black dark:text-white">
        <span>Thanks for subscribing</span>
      </div>
    </div>
  );
}
