"use client";

import React, { useState } from "react";
import { Search, TrendingUp } from "lucide-react";

const salaryData = [
  {
    role: "Frontend Developer",
    location: "Bangalore",
    avg: "₹8 LPA",
    range: "₹5L - ₹15L",
    experience: "0-3 years",
  },
  {
    role: "Backend Developer",
    location: "Hyderabad",
    avg: "₹10 LPA",
    range: "₹6L - ₹18L",
    experience: "1-4 years",
  },
  {
    role: "Full Stack Developer",
    location: "Remote",
    avg: "₹12 LPA",
    range: "₹8L - ₹22L",
    experience: "2-5 years",
  },
  {
    role: "Data Analyst",
    location: "Delhi",
    avg: "₹7 LPA",
    range: "₹4L - ₹12L",
    experience: "0-2 years",
  },
];

const SalaryExplorer = () => {
  const [search, setSearch] = useState("");

  const filtered = salaryData.filter((item) =>
    item.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">

        {/* HERO */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            Salary Explorer 💰
          </h1>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Discover salary insights based on role, experience, and location.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-10 flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm">
          <Search className="h-5 w-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search role (e.g. Frontend Developer)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        {/* CARDS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-slate-900">
                {item.role}
              </h3>

              <p className="text-sm text-slate-500">
                {item.location} • {item.experience}
              </p>

              <div className="mt-4">
                <p className="text-2xl font-bold text-green-600">
                  {item.avg}
                </p>
                <p className="text-sm text-slate-500">
                  Range: {item.range}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
                <TrendingUp className="h-4 w-4" />
                Growing Demand
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-slate-900">
            Want better salary insights?
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Sign up to get personalized salary reports.
          </p>
          <button className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

      </div>
    </section>
  );
};

export default SalaryExplorer;