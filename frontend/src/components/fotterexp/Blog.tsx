"use client";

import Image from "next/image";
import React from "react";

const companies = [
  {
    id: 1,
    name: "Google",
    industry: "Technology",
    location: "Bangalore, India",
    employees: "1.8L+ Employees",
    description: "Build products that help billions of users worldwide.",
    image: "https://picsum.photos/seed/company1/600/400",
  },
  {
    id: 2,
    name: "Microsoft",
    industry: "Software",
    location: "Hyderabad, India",
    employees: "2.2L+ Employees",
    description: "Empowering every person and organization to achieve more.",
    image: "https://picsum.photos/seed/company2/600/400",
  },
  {
    id: 3,
    name: "Amazon",
    industry: "E-commerce",
    location: "Pune, India",
    employees: "15L+ Employees",
    description: "Customer-first innovation in shopping, cloud, and AI.",
    image: "https://picsum.photos/seed/company3/600/400",
  },
  {
    id: 4,
    name: "Apple",
    industry: "Consumer Electronics",
    location: "Remote",
    employees: "1.6L+ Employees",
    description: "Designing premium devices and software experiences.",
    image: "https://picsum.photos/seed/company4/600/400",
  },
  {
    id: 5,
    name: "Infosys",
    industry: "IT Services",
    location: "Noida, India",
    employees: "3L+ Employees",
    description: "Digital transformation and consulting at enterprise scale.",
    image: "https://picsum.photos/seed/company5/600/400",
  },
  {
    id: 6,
    name: "TCS",
    industry: "IT Services",
    location: "Lucknow, India",
    employees: "6L+ Employees",
    description: "Global technology services with strong engineering focus.",
    image: "https://picsum.photos/seed/company6/600/400",
  },
  {
    id: 7,
    name: "Wipro",
    industry: "Consulting",
    location: "Chennai, India",
    employees: "2.5L+ Employees",
    description: "Business solutions powered by technology and innovation.",
    image: "https://picsum.photos/seed/company7/600/400",
  },
  {
    id: 8,
    name: "Accenture",
    industry: "Consulting",
    location: "Mumbai, India",
    employees: "7L+ Employees",
    description: "Delivering strategy, digital, cloud, and operations services.",
    image: "https://picsum.photos/seed/company8/600/400",
  },
  {
    id: 9,
    name: "IBM",
    industry: "Technology",
    location: "Bangalore, India",
    employees: "2.8L+ Employees",
    description: "Hybrid cloud and AI solutions for modern enterprises.",
    image: "https://picsum.photos/seed/company9/600/400",
  },
  {
    id: 10,
    name: "Oracle",
    industry: "Database",
    location: "Gurgaon, India",
    employees: "1.4L+ Employees",
    description: "Cloud applications and database technologies at scale.",
    image: "https://picsum.photos/seed/company10/600/400",
  },
  {
    id: 11,
    name: "Meta",
    industry: "Social Media",
    location: "Remote",
    employees: "8W+ Employees",
    description: "Building the future of connection and immersive platforms.",
    image: "https://picsum.photos/seed/company11/600/400",
  },
  {
    id: 12,
    name: "Netflix",
    industry: "Entertainment",
    location: "Remote",
    employees: "1.3W+ Employees",
    description: "Streaming entertainment powered by data and engineering.",
    image: "https://picsum.photos/seed/company12/600/400",
  },
  {
    id: 13,
    name: "Adobe",
    industry: "Creative Software",
    location: "Noida, India",
    employees: "3W+ Employees",
    description: "Creative, document, and experience solutions for everyone.",
    image: "https://picsum.photos/seed/company13/600/400",
  },
  {
    id: 14,
    name: "Paytm",
    industry: "Fintech",
    location: "Delhi, India",
    employees: "1W+ Employees",
    description: "Digital payments and commerce solutions across India.",
    image: "https://picsum.photos/seed/company14/600/400",
  },
  {
    id: 15,
    name: "Flipkart",
    industry: "E-commerce",
    location: "Bangalore, India",
    employees: "3W+ Employees",
    description: "Making shopping easier, faster, and more accessible.",
    image: "https://picsum.photos/seed/company15/600/400",
  },
  {
    id: 16,
    name: "Zoho",
    industry: "SaaS",
    location: "Chennai, India",
    employees: "1.5W+ Employees",
    description: "Business software suite for teams of every size.",
    image: "https://picsum.photos/seed/company16/600/400",
  },
  {
    id: 17,
    name: "Swiggy",
    industry: "Food Delivery",
    location: "Bangalore, India",
    employees: "6W+ Employees",
    description: "Fast logistics and delivery experiences for modern users.",
    image: "https://picsum.photos/seed/company17/600/400",
  },
  {
    id: 18,
    name: "Zomato",
    industry: "Food Tech",
    location: "Gurgaon, India",
    employees: "5W+ Employees",
    description: "Restaurant discovery, ordering, and hyperlocal delivery.",
    image: "https://picsum.photos/seed/company18/600/400",
  },
  {
    id: 19,
    name: "HCLTech",
    industry: "IT Services",
    location: "Noida, India",
    employees: "2.2L+ Employees",
    description: "Engineering, cloud, and digital transformation services.",
    image: "https://picsum.photos/seed/company19/600/400",
  },
  {
    id: 20,
    name: "Deloitte",
    industry: "Professional Services",
    location: "Hyderabad, India",
    employees: "4L+ Employees",
    description: "Audit, consulting, tax, and advisory for global clients.",
    image: "https://picsum.photos/seed/company20/600/400",
  },
];

const Blog = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            Top Companies
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Explore Popular Companies
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 md:text-base">
            Discover amazing companies with premium work culture, strong growth,
            and exciting career opportunities.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companies.map((company) => (
            <div
              key={company.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={company.image}
                  alt={company.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
                  {company.industry}
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-slate-900">
                  {company.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {company.description}
                </p>

                <div className="mt-4 space-y-2 text-sm text-slate-500">
                  <p>
                    <span className="font-semibold text-slate-700">Location:</span>{" "}
                    {company.location}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">Team Size:</span>{" "}
                    {company.employees}
                  </p>
                </div>

                <button className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
                  View Company
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;