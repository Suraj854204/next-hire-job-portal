"use client";

import { ArrowRight, BriefcaseBusiness, Search, Send, Trophy } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Create Your Profile",
    description:
      "Build a strong profile that highlights your skills, projects, experience, and achievements in just a few minutes.",
    icon: BriefcaseBusiness,
  },
  {
    id: "02",
    title: "Explore & Filter",
    description:
      "Browse verified opportunities and narrow results by role, salary, location, experience, and work mode.",
    icon: Search,
  },
  {
    id: "03",
    title: "Apply Instantly",
    description:
      "Apply quickly using your saved profile and keep track of all applications from one simple dashboard.",
    icon: Send,
  },
  {
    id: "04",
    title: "Get Hired",
    description:
      "Connect with recruiters, attend interviews, receive offers, and land the right job with confidence.",
    icon: Trophy,
  },
];

const LandTcs = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="container mx-auto px-5">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            How It Works
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Land your dream job
            <span className="block bg-linear-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">
              in 4 simple steps
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            A simple, fast, and modern hiring journey designed to help you move
            from profile creation to offer letter without confusion.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* top row */}
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="text-3xl font-black tracking-tight text-muted-foreground/30">
                    {step.id}
                  </span>
                </div>

                {/* content */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* arrow connector for large screens */}
                {index !== steps.length - 1 && (
                  <div className="absolute -right-4 top-10 hidden xl:flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandTcs;