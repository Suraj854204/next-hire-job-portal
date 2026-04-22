"use client";

import React from "react";
import Image from "next/image";
import {
  BookOpen,
  FileText,
  Users,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const resources = [
  {
    id: 1,
    title: "How to Write Better Job Descriptions",
    category: "Recruitment Guide",
    description:
      "Learn how to write clear, attractive, and conversion-focused job descriptions for top talent.",
    image: "https://picsum.photos/seed/hiring1/800/500",
  },
  {
    id: 2,
    title: "Top Interview Questions for Freshers",
    category: "Interviewing",
    description:
      "A practical set of screening and technical questions to evaluate entry-level candidates.",
    image: "https://picsum.photos/seed/hiring2/800/500",
  },
  {
    id: 3,
    title: "Hiring Pipeline Optimization Tips",
    category: "Hiring Process",
    description:
      "Reduce drop-offs, improve recruiter productivity, and speed up hiring without losing quality.",
    image: "https://picsum.photos/seed/hiring3/800/500",
  },
  {
    id: 4,
    title: "Employer Branding for Better Reach",
    category: "Branding",
    description:
      "Build a strong employer presence that attracts skilled candidates and improves trust.",
    image: "https://picsum.photos/seed/hiring4/800/500",
  },
  {
    id: 5,
    title: "Resume Screening Best Practices",
    category: "Screening",
    description:
      "Create a consistent approach to shortlist candidates faster and more accurately.",
    image: "https://picsum.photos/seed/hiring5/800/500",
  },
  {
    id: 6,
    title: "Remote Hiring and Onboarding",
    category: "Remote Work",
    description:
      "Best practices for recruiting, selecting, and onboarding remote employees effectively.",
    image: "https://picsum.photos/seed/hiring6/800/500",
  },
];

const highlights = [
  {
    title: "Recruitment Playbooks",
    desc: "Actionable hiring frameworks for startups, agencies, and enterprise teams.",
    icon: BookOpen,
  },
  {
    title: "Templates & Checklists",
    desc: "Ready-to-use hiring workflows, interview formats, and screening checklists.",
    icon: FileText,
  },
  {
    title: "Talent Strategy",
    desc: "Improve sourcing, employer branding, and offer acceptance with better planning.",
    icon: Users,
  },
  {
    title: "Faster Hiring",
    desc: "Optimize your hiring funnel and reduce time-to-hire with smarter processes.",
    icon: Briefcase,
  },
];

const HiringResources = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_30%)]" />
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                <Sparkles className="h-4 w-4" />
                Hiring Resources
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Better hiring starts with better resources
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                Explore practical guides, recruiter tips, templates, and proven
                hiring strategies to attract, evaluate, and hire the right
                talent faster.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
                  Explore Resources
                </button>
                <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Learn More
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Job description templates",
                "Interview scorecards",
                "Screening strategies",
                "Employer branding guides",
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Resource Cards */}
        <div className="mt-14">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Featured Resources
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Practical content designed for recruiters, hiring managers, and employers.
              </p>
            </div>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {resources.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
                    {item.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold leading-snug text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:gap-3">
                    Read Resource
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-900 px-6 py-10 text-center text-white md:px-10">
          <h3 className="text-2xl font-bold md:text-3xl">
            Need smarter hiring support?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Use these hiring resources to improve sourcing, interviewing,
            employer branding, and candidate quality across your hiring pipeline.
          </p>
          <div className="mt-6">
            <button className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              Start Hiring Better
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiringResources;