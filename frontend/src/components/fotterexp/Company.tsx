"use client";

import Image from "next/image";
import React from "react";

const companies = [
  {
    id: 1,
    name: "Google",
    industry: "Technology",
    location: "Bangalore",
    rating: "4.8",
    jobs: 120,
    image: "https://picsum.photos/seed/comp1/600/400",
  },
  {
    id: 2,
    name: "Microsoft",
    industry: "Software",
    location: "Hyderabad",
    rating: "4.7",
    jobs: 95,
    image: "https://picsum.photos/seed/comp2/600/400",
  },
  {
    id: 3,
    name: "Amazon",
    industry: "E-commerce",
    location: "Pune",
    rating: "4.5",
    jobs: 200,
    image: "https://picsum.photos/seed/comp3/600/400",
  },
  {
    id: 4,
    name: "Infosys",
    industry: "IT Services",
    location: "Noida",
    rating: "4.2",
    jobs: 60,
    image: "https://picsum.photos/seed/comp4/600/400",
  },
  {
    id: 5,
    name: "TCS",
    industry: "IT Services",
    location: "Lucknow",
    rating: "4.3",
    jobs: 150,
    image: "https://picsum.photos/seed/comp5/600/400",
  },
  {
    id: 6,
    name: "Flipkart",
    industry: "E-commerce",
    location: "Bangalore",
    rating: "4.4",
    jobs: 80,
    image: "https://picsum.photos/seed/comp6/600/400",
  },
];

const Company = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* HERO */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Explore Companies 🏢
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Discover top companies, explore open roles, and find your dream workplace.
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search companies..."
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select className="rounded-xl border px-4 py-3">
            <option>All Industries</option>
            <option>Technology</option>
            <option>E-commerce</option>
            <option>IT Services</option>
          </select>

          <button className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition">
            Search
          </button>
        </div>

        {/* COMPANY GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:-translate-y-2 hover:shadow-xl transition"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={company.image}
                  alt={company.name}
                  fill
                  className="object-cover group-hover:scale-110 transition"
                  unoptimized
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-slate-900">
                  {company.name}
                </h2>

                <p className="text-sm text-slate-500">
                  {company.industry} • {company.location}
                </p>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-yellow-500 font-semibold">
                    ⭐ {company.rating}
                  </span>
                  <span className="text-slate-500">
                    {company.jobs} Jobs
                  </span>
                </div>

                <button className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-blue-600 transition">
                  View Jobs
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Company;