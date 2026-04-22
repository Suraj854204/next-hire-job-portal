"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Search,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/context/AppContext";

const companies = [
  "Infosys",
  "TCS",
  "Wipro",
  "HCL Tech",
  "Razorpay",
  "Zepto",
  "CRED",
  "Zomato",
];

const HomeHeroSection = () => {
  const { user } = useAppData();

  return (
    <main className="bg-background text-foreground transition-colors duration-300">
      <section className="container mx-auto px-5 pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Trusted hiring platform for modern careers
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl xl:text-7xl">
              <span className="block text-foreground">Find Your</span>
              <span className="block bg-linear-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Dream Job
              </span>
              <span className="block text-muted-foreground">
                with{" "}
                <span className="bg-linear-to-r from-blue-600 to-rose-500 bg-clip-text font-bold text-transparent">
                  NextHire
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Discover verified jobs, connect with top companies, and build your
              career with confidence. Whether you are a job seeker or a
              recruiter, NextHire makes hiring simple, fast, and reliable.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {/* Recruiter */}
              {user?.role === "recruiter" && (
                <Button
                  asChild
                  className="h-12 rounded-full px-7 text-base"
                >
                  <Link
                    href="/recruiter/post-job"
                    className="flex items-center gap-2"
                  >
                    <Briefcase size={18} />
                    Post a Job
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              )}

              {/* Jobseeker */}
              {user?.role === "jobseeker" && (
                <Button
                  asChild
                  className="h-12 rounded-full px-7 text-base"
                >
                  <Link href="/jobs" className="flex items-center gap-2">
                    <Search size={18} />
                    Browse Jobs
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              )}

              {/* Guest / not logged in */}
              {!user && (
                <Button
                  asChild
                  className="h-12 rounded-full px-7 text-base"
                >
                  <Link href="/jobs" className="flex items-center gap-2">
                    <Search size={18} />
                    Browse Jobs
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              )}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 md:text-3xl">
                  10k+
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Active Jobs
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 md:text-3xl">
                  5k+
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">Companies</p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 md:text-3xl">
                  50k+
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Job Seekers
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4">
                <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 md:text-3xl">
                  98%
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Satisfaction Rate
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                Free to use
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                Verified employers
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                Secure platform
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-blue-500/10 via-cyan-500/5 to-rose-500/10 blur-2xl" />

            <div className="relative rounded-[28px] border border-border bg-card p-4 shadow-2xl">
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-950 via-blue-950 to-blue-700 p-8">
                <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-blue-400/20 blur-3xl" />
                <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" />

                <div className="relative z-10 flex min-h-[460px] flex-col justify-between">
                  <div className="flex justify-end">
                    <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 shadow">
                      2,000+ fresh openings
                    </div>
                  </div>

                  <div className="py-10 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-400/20 backdrop-blur">
                      <Briefcase size={30} className="text-white" />
                    </div>

                    <h3 className="text-3xl font-black text-white md:text-4xl">
                      Your Career Awaits
                    </h3>

                    <p className="mt-3 text-base text-blue-100">
                      Join 50,000+ professionals across India
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/95 p-4 shadow">
                      <h4 className="text-xl font-black text-slate-900">
                        2,000+
                      </h4>
                      <p className="text-sm font-medium text-slate-700">
                        Fresh openings
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Updated this week
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/95 p-4 shadow">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        <CheckCircle2 size={14} />
                        Verified Employers
                      </div>
                      <p className="text-sm text-slate-600">
                        Trusted companies hiring across India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg md:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/40">
                <Users size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  50k+ candidates
                </p>
                <p className="text-xs text-muted-foreground">
                  Active this month
                </p>
              </div>
            </div>

            <div className="absolute -left-6 -top-4 hidden items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg md:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40">
                <Building2
                  size={20}
                  className="text-emerald-600 dark:text-emerald-400"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Top companies
                </p>
                <p className="text-xs text-muted-foreground">Hiring now</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-5 pb-16 md:pb-20">
        <p className="mb-6 text-center text-sm font-semibold tracking-[0.2em] text-muted-foreground">
          TRUSTED BY TOP COMPANIES
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-border bg-card px-6 py-6 text-lg font-semibold text-muted-foreground shadow-sm md:gap-8 md:text-2xl">
          {companies.map((company) => (
            <span
              key={company}
              className="opacity-80 transition hover:text-foreground hover:opacity-100"
            >
              {company}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomeHeroSection;