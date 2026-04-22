"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Search,
  MapPin,
  Briefcase,
  Star,
  ArrowRight,
  Filter,
  Users,
} from "lucide-react";

const candidates = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Frontend Developer",
    experience: "2 Years",
    location: "Bangalore",
    skills: ["React", "Next.js", "Tailwind", "TypeScript"],
    rating: 4.8,
    available: "Immediate",
    image: "https://picsum.photos/seed/talent1/400/400",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Backend Developer",
    experience: "3 Years",
    location: "Hyderabad",
    skills: ["Node.js", "Express", "PostgreSQL", "Redis"],
    rating: 4.7,
    available: "15 Days",
    image: "https://picsum.photos/seed/talent2/400/400",
  },
  {
    id: 3,
    name: "Rohit Kumar",
    role: "Full Stack Developer",
    experience: "1 Year",
    location: "Remote",
    skills: ["MERN", "MongoDB", "React", "JavaScript"],
    rating: 4.6,
    available: "Immediate",
    image: "https://picsum.photos/seed/talent3/400/400",
  },
  {
    id: 4,
    name: "Sneha Singh",
    role: "UI/UX Designer",
    experience: "4 Years",
    location: "Delhi",
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
    rating: 4.9,
    available: "30 Days",
    image: "https://picsum.photos/seed/talent4/400/400",
  },
  {
    id: 5,
    name: "Aditya Raj",
    role: "Java Developer",
    experience: "2 Years",
    location: "Pune",
    skills: ["Java", "Spring Boot", "MySQL", "REST API"],
    rating: 4.5,
    available: "Immediate",
    image: "https://picsum.photos/seed/talent5/400/400",
  },
  {
    id: 6,
    name: "Neha Yadav",
    role: "Data Analyst",
    experience: "3 Years",
    location: "Noida",
    skills: ["SQL", "Python", "Power BI", "Excel"],
    rating: 4.6,
    available: "15 Days",
    image: "https://picsum.photos/seed/talent6/400/400",
  },
  {
    id: 7,
    name: "Karan Mehta",
    role: "DevOps Engineer",
    experience: "5 Years",
    location: "Remote",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    rating: 4.8,
    available: "30 Days",
    image: "https://picsum.photos/seed/talent7/400/400",
  },
  {
    id: 8,
    name: "Anjali Gupta",
    role: "HR Executive",
    experience: "2 Years",
    location: "Lucknow",
    skills: ["Recruitment", "Screening", "Communication", "ATS"],
    rating: 4.4,
    available: "Immediate",
    image: "https://picsum.photos/seed/talent8/400/400",
  },
];

const TalentSearch = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [availability, setAvailability] = useState("All");

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        candidate.role.toLowerCase().includes(search.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(search.toLowerCase())
        );

      const matchesLocation =
        location === "All" || candidate.location === location;

      const matchesAvailability =
        availability === "All" || candidate.available === availability;

      return matchesSearch && matchesLocation && matchesAvailability;
    });
  }, [search, location, availability]);

  return (
    <section className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
            <Users className="h-4 w-4" />
            Talent Search
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Discover top talent faster
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            Search skilled candidates by role, skills, location, and availability
            to hire the right people for your team.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
              <Search className="h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name, role, or skills"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
            >
              <option value="All">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Noida">Noida</option>
              <option value="Lucknow">Lucknow</option>
            </select>

            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
            >
              <option value="All">All Availability</option>
              <option value="Immediate">Immediate</option>
              <option value="15 Days">15 Days</option>
              <option value="30 Days">30 Days</option>
            </select>

            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="mb-5 flex items-start gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                    <Image
                      src={candidate.image}
                      alt={candidate.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-xl font-bold text-slate-900">
                      {candidate.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-600">
                      {candidate.role}
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {candidate.experience}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {candidate.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-xs text-slate-500">Availability</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {candidate.available}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">Rating</p>
                    <p className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                      <Star className="h-4 w-4 fill-current" />
                      {candidate.rating}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Top Skills
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
                    View Profile
                  </button>

                  <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    Contact
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h3 className="text-xl font-bold text-slate-900">
              No matching talent found
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Try changing role, skills, location, or availability filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TalentSearch;