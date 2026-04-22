import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Sparkles,
  Users,
  ShieldCheck,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Talent Meets Opportunity",
    description:
      "We connect skilled job seekers with companies that value growth, innovation, and long-term success.",
  },
  {
    icon: Building2,
    title: "Built For Recruiters",
    description:
      "HireHeaven helps recruiters discover qualified candidates faster with a streamlined hiring experience.",
  },
  {
    icon: Sparkles,
    title: "Smarter Career Growth",
    description:
      "From job discovery to profile building, we help users move forward with clarity and confidence.",
  },
];

const values = [
  {
    icon: Target,
    title: "Our Vision",
    description:
      "To make hiring simpler, faster, and more meaningful for both candidates and employers.",
  },
  {
    icon: ShieldCheck,
    title: "Our Commitment",
    description:
      "We focus on trust, usability, and quality so every interaction on HireHeaven feels reliable and valuable.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Our Impact",
    description:
      "We aim to create real career opportunities and help businesses build stronger teams.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-border bg-muted/40 px-4 py-1.5 text-sm text-muted-foreground">
              About NextHire
            </div>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Connecting Talent With the
              <span className="block bg-linear-to-r from-blue-600 to-red-500 bg-clip-text text-transparent">
                Right Opportunities
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              At HireHeaven, our mission is to transform the hiring journey by
              building a platform where job seekers and recruiters connect with
              confidence. We believe careers grow faster when the right people
              meet the right opportunities.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/jobs">
                <Button size="lg" className="h-12 px-8">
                  Explore Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8"
                >
                  Join NextHire
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-blue-500/20 via-transparent to-red-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              <Image
                src="/about.jpeg"
                alt="About NextHire"
                width={900}
                height={700}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Why NextHire?
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              We are building more than a job portal. We are building a platform
              that supports better hiring decisions and stronger career growth.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-14 md:py-20">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            What Drives Us
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Every feature we build is designed to make hiring more efficient,
            more transparent, and more human.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary/40">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card px-6 py-10 text-center shadow-lg md:px-10">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Ready to find your dream job?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Join NextHire and discover opportunities that match your skills,
              ambition, and career goals.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/jobs">
                <Button size="lg" className="h-12 px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/register">
                <Button size="lg" variant="outline" className="h-12 px-8">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;