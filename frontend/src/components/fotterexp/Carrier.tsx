"use client";

import React from "react";
import Image from "next/image";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    type: "Full Time",
    location: "Remote",
    image: "https://picsum.photos/seed/job1/600/400",
  },
  {
    id: 2,
    title: "Backend Developer",
    type: "Full Time",
    location: "Bangalore",
    image: "https://picsum.photos/seed/job2/600/400",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    type: "Internship",
    location: "Remote",
    image: "https://picsum.photos/seed/job3/600/400",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    type: "Full Time",
    location: "Hyderabad",
    image: "https://picsum.photos/seed/job4/600/400",
  },
];

const Carrier = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        
        {/* HERO SECTION */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Join Our Team 🚀
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            We are building the future of hiring. Work with top engineers,
            designers, and innovators.
          </p>
        </div>

        {/* CULTURE SECTION */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Innovative Work",
              desc: "Work on real-world impactful projects.",
            },
            {
              title: "Flexible Environment",
              desc: "Remote-friendly and flexible work culture.",
            },
            {
              title: "Growth Opportunities",
              desc: "Learn, grow, and scale your career fast.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* JOB LIST */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Open Positions
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:-translate-y-2 hover:shadow-xl transition"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={job.image}
                    alt={job.title}
                    fill
                    className="object-cover group-hover:scale-110 transition"
                    unoptimized
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    {job.title}
                  </h3>

                  <div className="mt-2 text-sm text-slate-500">
                    <p>{job.type}</p>
                    <p>{job.location}</p>
                  </div>

                  <button className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm text-white hover:bg-blue-600 transition">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-slate-900">
            Didn't find your role?
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Send us your resume and we’ll get back to you.
          </p>
          <button className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition">
            Submit Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carrier;