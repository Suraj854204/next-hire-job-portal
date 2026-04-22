"use client";

import React from "react";
import { Check, Sparkles, BadgeDollarSign, Building2 } from "lucide-react";

const plans = [
  {
    id: 1,
    name: "Starter",
    price: "₹0",
    period: "/month",
    description: "Best for small teams getting started with hiring.",
    icon: BadgeDollarSign,
    featured: false,
    features: [
      "1 active job posting",
      "Basic candidate management",
      "Standard support",
      "Company profile page",
      "7 days job visibility",
    ],
    buttonText: "Get Started",
  },
  {
    id: 2,
    name: "Professional",
    price: "₹1,999",
    period: "/month",
    description: "Perfect for growing businesses with regular hiring needs.",
    icon: Sparkles,
    featured: true,
    features: [
      "10 active job postings",
      "Advanced candidate tracking",
      "Priority support",
      "Featured company profile",
      "30 days job visibility",
      "Basic analytics dashboard",
    ],
    buttonText: "Choose Professional",
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with high-volume hiring.",
    icon: Building2,
    featured: false,
    features: [
      "Unlimited job postings",
      "Dedicated account manager",
      "Custom hiring workflows",
      "Advanced analytics",
      "Recruiter collaboration tools",
      "Priority employer branding",
    ],
    buttonText: "Contact Sales",
  },
];

const Pricing = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
            Pricing Plans
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Simple pricing for every hiring stage
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            Choose the plan that fits your hiring goals. Start free, scale when
            your recruitment needs grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl border bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  plan.featured
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-slate-200"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white shadow">
                    Most Popular
                  </span>
                )}

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
                  <Icon className="h-7 w-7" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">{plan.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-4xl font-bold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-sm text-slate-500">
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-7 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                    plan.featured
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900">
            Need a custom hiring solution?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            For large teams, agencies, or enterprise workflows, we can create a
            tailored plan with custom integrations, support, and hiring features.
          </p>
          <button className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
            Talk to Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;