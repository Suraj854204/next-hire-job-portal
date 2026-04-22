"use client";

import Image from "next/image";
import React from "react";

const articles = [
  {
    id: 1,
    title: "How to Crack Your First Tech Interview",
    category: "Interview Tips",
    image: "https://picsum.photos/seed/advice1/600/400",
    desc: "Learn the best strategies to clear coding interviews easily.",
  },
  {
    id: 2,
    title: "Resume Tips for Freshers",
    category: "Resume",
    image: "https://picsum.photos/seed/advice2/600/400",
    desc: "Make your resume stand out with these proven tips.",
  },
  {
    id: 3,
    title: "Top Skills in 2026",
    category: "Career Growth",
    image: "https://picsum.photos/seed/advice3/600/400",
    desc: "Skills you must learn to stay ahead in the job market.",
  },
  {
    id: 4,
    title: "How to Get Internship Fast",
    category: "Internship",
    image: "https://picsum.photos/seed/advice4/600/400",
    desc: "Step-by-step guide to land your first internship.",
  },
  {
    id: 5,
    title: "DSA Roadmap for Beginners",
    category: "Programming",
    image: "https://picsum.photos/seed/advice5/600/400",
    desc: "Complete roadmap to master DSA from scratch.",
  },
  {
    id: 6,
    title: "Mistakes to Avoid in Interviews",
    category: "Interview",
    image: "https://picsum.photos/seed/advice6/600/400",
    desc: "Common mistakes that can cost you your dream job.",
  },
];

const CareerAdvice = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* HERO */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Career Advice 💡
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Expert tips, guides, and strategies to boost your career and land your dream job.
          </p>
        </div>

        {/* CATEGORY CARDS */}
        <div className="mb-12 grid gap-6 md:grid-cols-4">
          {["Resume", "Interview", "Skills", "Internship"].map((cat, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-5 text-center shadow-sm hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="font-semibold text-slate-900">{cat}</h3>
            </div>
          ))}
        </div>

        {/* ARTICLES */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Latest Articles
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((item) => (
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
                  <span className="text-xs font-semibold text-blue-600">
                    {item.category}
                  </span>

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

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-slate-900">
            Want personalized guidance?
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Get expert career advice based on your skills and goals.
          </p>
          <button className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default CareerAdvice;