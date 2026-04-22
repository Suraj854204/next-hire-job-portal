"use client";

import {
  BriefcaseBusiness,
  Building2,
  HeartPulse,
  Palette,
  ShoppingBag,
  GraduationCap,
  Rocket,
  Factory,
  MonitorSmartphone,
  Scale,
  Plane,
  Sprout,
} from "lucide-react";

const industries = [
  {
    title: "Technology",
    jobs: "3,200+ jobs",
    icon: MonitorSmartphone,
  },
  {
    title: "Finance & Banking",
    jobs: "1,450+ jobs",
    icon: Building2,
  },
  {
    title: "Healthcare",
    jobs: "980+ jobs",
    icon: HeartPulse,
  },
  {
    title: "Design & Creative",
    jobs: "760+ jobs",
    icon: Palette,
  },
  {
    title: "E-Commerce",
    jobs: "1,100+ jobs",
    icon: ShoppingBag,
  },
  {
    title: "Education & EdTech",
    jobs: "640+ jobs",
    icon: GraduationCap,
  },
  {
    title: "Startups",
    jobs: "2,300+ jobs",
    icon: Rocket,
  },
  {
    title: "Manufacturing",
    jobs: "530+ jobs",
    icon: Factory,
  },
  {
    title: "Media & Marketing",
    jobs: "890+ jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Legal & Compliance",
    jobs: "310+ jobs",
    icon: Scale,
  },
  {
    title: "Travel & Hospitality",
    jobs: "420+ jobs",
    icon: Plane,
  },
  {
    title: "Green & Sustainability",
    jobs: "180+ jobs",
    icon: Sprout,
  },
];

const JobsAcross = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-5">
        {/* Heading */}
        <div className="max-w-4xl">
          <p className="inline-flex items-center rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Explore Industries
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Jobs across
            <span className="block bg-linear-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">
              every sector
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            From technology to finance, healthcare to design — discover
            opportunities in industries that match your skills, passion, and
            long-term goals.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <div
                key={industry.title}
                className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">
                  {industry.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {industry.jobs}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobsAcross;