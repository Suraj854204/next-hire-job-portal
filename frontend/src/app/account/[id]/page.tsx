"use client";

import { user_service } from "@/context/AppContext";
import { User } from "@/type";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/components/loading";
import Info from "../components/info";
import Skills from "../components/skills";
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";

const UserAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  async function fetchUser() {
    setLoading(true);
    setError(false);
    const token = Cookies.get("token");
    try {
      const { data } = await axios.get(`${user_service}/api/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [id]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Dark top bar skeleton */}
        <div className="h-36 w-full bg-[#080c18]" />
        <div className="mx-auto max-w-2xl px-4 -mt-14 pb-16 space-y-4">
          {/* Avatar skeleton */}
          <div className="h-[88px] w-[88px] rounded-full bg-muted animate-pulse border-[3px] border-background" />
          {/* Name skeleton */}
          <div className="space-y-2 pt-2">
            <div className="h-5 w-40 rounded-lg bg-muted animate-pulse" />
            <div className="h-3.5 w-24 rounded-lg bg-muted animate-pulse" />
          </div>
          {/* Card skeleton */}
          <div className="rounded-3xl border border-border/50 bg-muted/20 h-48 animate-pulse" />
          <div className="rounded-3xl border border-border/50 bg-muted/20 h-32 animate-pulse" />
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !user) {
    return (
      <div className="min-h-screen bg-background">
        {/* Dark top bar */}
        <div className="relative h-48 w-full overflow-hidden bg-[#080c18]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-red-600/10 blur-[60px]" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-red-900/10 blur-[50px]" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl px-4">
          <div className="relative -mt-16 overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm px-8 py-12 text-center">
            {/* Icon */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/50 bg-muted/40">
              <AlertCircle className="h-7 w-7 text-muted-foreground/60" />
            </div>

            <h2 className="text-[18px] font-semibold text-foreground">
              Profile not found
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              This profile may have been removed, made private, or the link is
              no longer valid.
            </p>

            <div className="mt-7 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center">
              <Link
                href="/jobs"
                className="flex items-center gap-1.5 rounded-xl border border-border/60 bg-background px-4 py-2 text-[12px] font-medium text-foreground transition-colors hover:bg-muted"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Jobs
              </Link>
              <button
                onClick={fetchUser}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-blue-500"
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Profile ── */
  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Jobs
        </Link>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl space-y-4 px-4 pb-20 pt-4">
        <Info user={user} isYourAccount={false} />
        {user.role === "jobseeker" && (
          <Skills user={user} isYourAccount={false} />
        )}
      </div>
    </div>
  );
};

export default UserAccount;