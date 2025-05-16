"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

type ContactFormProps = {
  title?: string;
  subtitle?: string;
  emailRecipient?: string;
  successMessage?: string;
  nameFieldLabel?: string;
  emailFieldLabel?: string;
  messageFieldLabel?: string;
  submitButtonText?: string;
};

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm({
  title = "Contact Us",
  subtitle = "We'd love to hear from you",
  emailRecipient = "contact@example.com",
  successMessage = "Thank you for your message. We'll get back to you soon!",
  nameFieldLabel = "Your Name",
  emailFieldLabel = "Your Email",
  messageFieldLabel = "Your Message",
  submitButtonText = "Send Message",
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recipient: emailRecipient,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }

      reset();
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container max-w-4xl mx-auto my-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative p-8 bg-black border border-white/20 rounded-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-dot-thick-neutral-300/15 dark:bg-dot-thick-neutral-800/15 pointer-events-none" />

          <div className="relative z-10 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-900/30 border border-green-500/30 mb-6">
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Message Sent!
            </h3>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
              {successMessage}
            </p>

            <div className="inline-block relative top-0 left-0 min-w-[200px] h-14 text-sm overflow-hidden group/btn">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="pointer-events-auto absolute top-0 left-0 border-t border-b border-white/20 justify-between font-bold flex w-full p-4 text-white hover:cursor-pointer tracking-wider group-hover/btn:-top-12 transition-all duration-250 ease-in-out"
              >
                <div className="flex justify-between items-center w-full">
                  <span>Send another message</span>
                  <ArrowRight size={16} />
                </div>
              </button>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="pointer-events-auto border bg-slate-100 absolute font-bold left-0 flex justify-between top-[100%] w-full group-hover/btn:top-0 text-slate-900 transition-all duration-250 ease-in-out p-4 hover:cursor-pointer tracking-wider"
              >
                <div className="flex justify-between items-center w-full">
                  <span>Send another message</span>
                  <ArrowRight className="rotate-45" size={16} />
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto my-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative p-8 bg-black border border-white/20 rounded-lg overflow-hidden"
      >
        <div className="absolute inset-0 bg-dot-thick-neutral-300/15 dark:bg-dot-thick-neutral-800/15 pointer-events-none" />

        <div className="relative z-10">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold text-center text-white mb-3"
            >
              {title}
            </motion.h2>
          )}

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center text-gray-300 mb-10 max-w-xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 text-sm text-red-400 bg-red-900/30 border border-red-500/30 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  {nameFieldLabel}
                </label>
                <input
                  id="name"
                  type="text"
                  className={`block w-full bg-gray-900/50 border ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  } rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors`}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  {emailFieldLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  className={`block w-full bg-gray-900/50 border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {messageFieldLabel}
              </label>
              <textarea
                id="message"
                rows={6}
                className={`block w-full bg-gray-900/50 border ${
                  errors.message ? "border-red-500" : "border-gray-700"
                } rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors`}
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              <div className="inline-block relative top-0 left-0 w-full h-14 text-sm overflow-hidden group/btn">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="pointer-events-auto absolute top-0 left-0 border-t border-b border-white/20 justify-between font-bold flex w-full p-4 text-white hover:cursor-pointer tracking-wider group-hover/btn:-top-12 transition-all duration-250 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex justify-between items-center w-full">
                    <span>
                      {isSubmitting ? "Sending..." : submitButtonText}
                    </span>
                    <ArrowRight size={16} />
                  </div>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="pointer-events-auto border bg-white absolute font-bold left-0 flex justify-between top-[100%] w-full group-hover/btn:top-0 text-black transition-all duration-250 ease-in-out p-4 hover:cursor-pointer tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex justify-between items-center w-full">
                    <span>
                      {isSubmitting ? "Sending..." : submitButtonText}
                    </span>
                    <ArrowRight className="rotate-45" size={16} />
                  </div>
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
