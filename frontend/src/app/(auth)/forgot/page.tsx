"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth_service, useAppData } from "@/context/AppContext";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Mail, SendHorizonal, MailCheck } from "lucide-react";

const ForgotPage = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { isAuth } = useAppData();
  if (isAuth) return redirect("/");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const { data } = await axios.post(`${auth_service}/api/auth/forgot`, {
        email,
      });

      toast.success(data?.message || "Reset link sent successfully");
      setSubmitted(true);
      setEmail("");
    } catch (error: any) {
      console.log("Forgot password error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Mail className="h-3 w-3 text-primary" />
            Password recovery
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Forgot your password?
          </h1>
          <p className="text-sm text-muted-foreground">
            No worries — enter your email and we'll send you a reset link.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="rounded-full bg-primary/10 p-4">
                <MailCheck className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">
                  Check your inbox
                </p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  We've sent a password reset link to your email. It may take a
                  minute to arrive.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors mt-1"
              >
                Didn't receive it? Try again
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={submitHandler} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 pl-9 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={btnLoading}
                className="w-full h-11 rounded-xl font-semibold gap-2"
              >
                {btnLoading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Sending link...
                  </>
                ) : (
                  <>
                    Send reset link
                    <SendHorizonal className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Back to login */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;