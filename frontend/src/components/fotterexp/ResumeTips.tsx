"use client";

import Image from "next/image";
import React from "react";
import { CheckCircle2, FileText, Sparkles } from "lucide-react";

const tips = [
  {
    id: 1,
    title: "Keep Your Resume Short & Clear",
    desc: "1–2 pages max. Recruiters scan resumes in seconds.",
  },
  {
    id: 2,
    title: "Use Action Verbs",
    desc: "Use words like Built, Designed, Optimized instead of ‘Worked on’.",
  },
  {
    id: 3,
    title: "Add Quantifiable Results",
    desc: "Example: Improved performance by 30%, handled 10k+ users.",
  },
  {
    id: 4,
    title: "Customize for Each Job",
    desc: "Tailor your resume based on job description keywords.",
  },
  {
    id: 5,
    title: "Highlight Skills Section",
    desc: "Mention technical + soft skills clearly.",
  },
  {
    id: 6,
    title: "Avoid Spelling Mistakes",
    desc: "Always proofread before sending your resume.",
  },
];

const examples = [
  {
    title: "Good Resume Format",
    image: "https://picsum.photos/seed/resume1/600/400",
  },
  {
    title: "Modern ATS-Friendly Resume",
    image: "https://picsum.photos/seed/resume2/600/400",
  },
  {
    title: "Fresher Resume Example",
    image: "https://picsum.photos/seed/resume3/600/400",
  },
];

const ResumeTips = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* HERO */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
            <Sparkles className="h-4 w-4" />
            Resume Guide
          </span>

          <h1 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl">
            Resume Tips to Get Hired 🚀
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Learn how to build a powerful resume that stands out and gets you interview calls.
          </p>
        </div>

        {/* TIPS GRID */}
        <div className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {tip.title}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>

        {/* EXAMPLES */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Resume Examples
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((item, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:-translate-y-2 hover:shadow-xl transition"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition"
                    unoptimized
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <button className="mt-3 text-sm text-blue-600 font-semibold hover:underline">
                    View Template →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-slate-900 p-8 text-center text-white">
          <FileText className="mx-auto h-10 w-10 mb-3" />
          <h3 className="text-2xl font-bold">
            Want a Professional Resume?
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Create your ATS-friendly resume in minutes with our smart builder.
          </p>
          <button className="mt-4 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 transition">
            Build Resume
          </button>
        </div>

      </div>
    </section>
  );
};

export default ResumeTips;