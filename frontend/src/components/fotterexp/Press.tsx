"use client";

import Image from "next/image";
import React from "react";

const pressReleases = [
  {
    id: 1,
    title: "NextHire Raises Seed Funding to Transform Hiring",
    date: "Jan 2026",
    desc: "NextHire secures funding to build AI-powered recruitment solutions.",
    image: "https://picsum.photos/seed/press1/600/400",
  },
  {
    id: 2,
    title: "NextHire Launches Smart Job Matching System",
    date: "Feb 2026",
    desc: "New AI feature improves job recommendations for users.",
    image: "https://picsum.photos/seed/press2/600/400",
  },
  {
    id: 3,
    title: "NextHire Expands to Global Market",
    date: "Mar 2026",
    desc: "Platform now supports international job listings and companies.",
    image: "https://picsum.photos/seed/press3/600/400",
  },
];

const mediaLogos = [
  "https://picsum.photos/seed/logo1/200/100",
  "https://picsum.photos/seed/logo2/200/100",
  "https://picsum.photos/seed/logo3/200/100",
  "https://picsum.photos/seed/logo4/200/100",
];

const Press = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* HERO */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Press & Media 📰
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Latest news, announcements, and media coverage about NextHire.
          </p>
        </div>

        {/* MEDIA LOGOS */}
        <div className="mb-14 grid grid-cols-2 gap-6 md:grid-cols-4">
          {mediaLogos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-xl border bg-white p-4 shadow-sm"
            >
              <Image
                src={logo}
                alt="media"
                width={120}
                height={60}
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* PRESS RELEASES */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Latest Press Releases
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pressReleases.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:-translate-y-2 hover:shadow-xl transition"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition"
                    unoptimized
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs text-slate-500">{item.date}</p>

                  <h3 className="mt-2 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600">
                    {item.desc}
                  </p>

                  <button className="mt-4 text-sm font-semibold text-blue-600 hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT PRESS */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-slate-900">
            Media Inquiries
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            For press-related questions, please contact our media team.
          </p>
          <p className="mt-3 text-blue-600 font-semibold">
            press@nexthire.com
          </p>
        </div>

      </div>
    </section>
  );
};

export default Press;