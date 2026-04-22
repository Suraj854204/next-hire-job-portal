"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { job_service } from "@/context/AppContext";
import { Job } from "@/type";
import {
  Briefcase,
  Clock3,
  Filter,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
  X,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import JobCard from "@/components/job-card";

type ActiveSection = "all" | "recommended" | "latest";

function useCounter(target: number) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));

    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(id);
  }, [target]);

  return count;
}

function isWithinLast5Days(dateString?: string) {
  if (!dateString) return false;
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return false;
  return (Date.now() - d.getTime()) / 86400000 <= 5;
}

function StatCard({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 backdrop-blur-sm transition-all duration-300 hover:bg-muted/60">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-3 text-4xl font-light text-foreground">
        {value}
        <span className="text-xl text-muted-foreground">{suffix}</span>
      </p>
    </div>
  );
}

function SectionTab({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-5 py-2 text-[12px] font-semibold tracking-wide transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground shadow-lg"
          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function SectionHeading({
  icon: Icon,
  label,
  count,
  iconBg,
}: {
  icon: React.ElementType;
  label: string;
  count: number;
  iconBg: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-[17px] font-semibold tracking-tight text-foreground">
          {label}
        </h2>
      </div>
      <span className="rounded-lg bg-muted/80 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
        {count} result{count !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  desc,
  action,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/50 bg-muted/20 px-8 py-24 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <Icon className="h-7 w-7 text-muted-foreground/40" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
        {desc}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export default function JobsPage() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>("all");

  const token = Cookies.get("token");
  const filterTriggerRef = useRef<HTMLButtonElement>(null);

  const [saved, setSaved] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("savedJobs");
      if (stored) setSaved(JSON.parse(stored));
    } catch {}
  }, []);

  const toggleSave = (id: number) => {
    setSaved((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      localStorage.setItem("savedJobs", JSON.stringify(next));
      return next;
    });
  };

  async function fetchJobs() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${job_service}/api/job/all?title=${encodeURIComponent(
          title
        )}&location=${encodeURIComponent(location)}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setJobs(data?.jobs ?? data ?? []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const t = setTimeout(fetchJobs, 400);
    return () => clearTimeout(t);
  }, [title, location]);

  const suggestions = useMemo(() => {
    const seen = new Set<string>();
    jobs.forEach((j) => {
      if (j.title) seen.add(j.title);
    });
    return Array.from(seen).slice(0, 6);
  }, [jobs]);

  const recommended = useMemo(
    () => [...jobs].sort((a, b) => (b.salary ?? 0) - (a.salary ?? 0)).slice(0, 3),
    [jobs]
  );

  const latestJobs = useMemo(
    () => jobs.filter((j: any) => isWithinLast5Days(j.created_at)),
    [jobs]
  );

  const totalC = useCounter(jobs.length);
  const activeC = useCounter(jobs.filter((j) => j.is_active).length);
  const locC = useCounter(new Set(jobs.map((j) => j.location)).size);

  const hasFilters = Boolean(title.trim() || location.trim());

  const clearFilters = () => {
    setTitle("");
    setLocation("");
    setActiveSection("all");
  };

  const displayedJobs =
    activeSection === "recommended"
      ? recommended
      : activeSection === "latest"
      ? latestJobs
      : jobs;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden border-b bg-background">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute -bottom-20 right-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(127,127,127,1) 1px,transparent 1px),linear-gradient(90deg,rgba(127,127,127,1) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-14 md:px-6 md:pb-16 md:pt-16 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-300">
            <Sparkles className="h-3 w-3" />
            Curated opportunities
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
          </div>

          <h1 className="max-w-2xl text-[38px] font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-[56px]">
            Find work that
            <br />
            <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300">
              matters to you
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-muted-foreground">
            Explore thousands of curated roles. Search by title, filter by
            location, and land your next opportunity.
          </p>

          <div className="relative mt-8 max-w-2xl">
            <div className="flex items-center gap-0 overflow-hidden rounded-2xl border border-border bg-card ring-1 ring-transparent backdrop-blur-md transition-all focus-within:border-primary/40 focus-within:ring-primary/10">
              <div className="flex flex-1 items-center gap-3 px-4">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setSuggestionsOpen(true)}
                  onBlur={() => setTimeout(() => setSuggestionsOpen(false), 150)}
                  placeholder="Job title, role, or keyword…"
                  className="flex-1 bg-transparent py-3.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                {title && (
                  <button
                    onClick={() => setTitle("")}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="h-6 w-px bg-border" />

              <div className="flex items-center gap-2 px-3">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="w-28 bg-transparent py-3.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => filterTriggerRef.current?.click()}
                className="flex items-center gap-1.5 bg-primary px-5 py-3.5 text-[12px] font-semibold text-primary-foreground transition-colors hover:opacity-90"
              >
                <Filter className="h-3.5 w-3.5" />
                Filter
              </button>
            </div>

            {suggestionsOpen && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onMouseDown={() => {
                      setTitle(item);
                      setSuggestionsOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] text-foreground transition-colors hover:bg-muted"
                  >
                    <Search className="h-3.5 w-3.5 text-muted-foreground" />
                    {item}
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/40" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {hasFilters && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {title && (
                <span className="flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[11px] font-medium text-blue-600 dark:text-blue-300">
                  {title}
                  <button onClick={() => setTitle("")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[11px] font-medium text-blue-600 dark:text-blue-300">
                  {location}
                  <button onClick={() => setLocation("")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-[11px] text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <SectionTab
                active={activeSection === "all"}
                onClick={() => setActiveSection("all")}
                icon={Briefcase}
                label="All Jobs"
              />
              <SectionTab
                active={activeSection === "recommended"}
                onClick={() => setActiveSection("recommended")}
                icon={TrendingUp}
                label="Top Picks"
              />
              <SectionTab
                active={activeSection === "latest"}
                onClick={() => setActiveSection("latest")}
                icon={Clock3}
                label="Just Added"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 lg:w-72">
              <StatCard label="Total" value={totalC} />
              <StatCard label="Active" value={activeC} />
              <StatCard label="Cities" value={locC} />
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="mx-auto max-w-7xl px-4 py-10 pb-16 md:px-6 lg:px-8">
        {loading ? (
          <Loading />
        ) : displayedJobs.length > 0 ? (
          <section>
            <SectionHeading
              icon={
                activeSection === "recommended"
                  ? TrendingUp
                  : activeSection === "latest"
                  ? Clock3
                  : Briefcase
              }
              label={
                activeSection === "recommended"
                  ? "Top Picks"
                  : activeSection === "latest"
                  ? "Just Added (Last 5 Days)"
                  : "All Jobs"
              }
              count={displayedJobs.length}
              iconBg={
                activeSection === "recommended"
                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300"
              }
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {displayedJobs.map((job) => (
                <JobCard
                  key={`${activeSection}-${job.job_id}`}
                  job={job}
                  saved={saved.includes(job.job_id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          </section>
        ) : (
          <EmptyState
            icon={
              activeSection === "recommended"
                ? TrendingUp
                : activeSection === "latest"
                ? Clock3
                : Briefcase
            }
            title={
              activeSection === "recommended"
                ? "No top picks yet"
                : activeSection === "latest"
                ? "Nothing new recently"
                : "No jobs found"
            }
            desc={
              activeSection === "recommended"
                ? "Recommended roles appear here based on salary and relevance."
                : activeSection === "latest"
                ? "No jobs were posted in the last 5 days. Check back soon."
                : "Try adjusting your search or clearing filters to see more results."
            }
            action={
              hasFilters ? (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="rounded-xl"
                >
                  <X className="mr-2 h-4 w-4" /> Clear Filters
                </Button>
              ) : undefined
            }
          />
        )}
      </div>

      {/* Filters Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={filterTriggerRef} className="hidden" aria-hidden>
            Open Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-2xl border border-border bg-background">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-foreground">
              Filter Jobs
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Job Title
              </label>
              <Input
                placeholder="e.g. Frontend Developer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Location
              </label>
              <Input
                placeholder="e.g. Bengaluru"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            {hasFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="w-full text-muted-foreground"
              >
                <X className="mr-2 h-4 w-4" /> Clear All Filters
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}