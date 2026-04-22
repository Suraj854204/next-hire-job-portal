"use client";

import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { job_service, useAppData } from "@/context/AppContext";
import { Application, Job } from "@/type";
import axios from "axios";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  DollarSign,
  MapPin,
  Users,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Clock3,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Link from "next/link";

const JobPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user, applyJob, applications, btnLoading } = useAppData();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  const [jobApplications, setJobApplications] = useState<Application[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [statusMap, setStatusMap] = useState<Record<number, string>>({});

  const token = Cookies.get("token");

  useEffect(() => {
    if (applications && id) {
      const hasApplied = applications.some(
        (item: any) => item.job_id.toString() === id
      );
      setApplied(hasApplied);
    }
  }, [applications, id]);

  async function fetchSingleJob() {
    try {
      const { data } = await axios.get(`${job_service}/api/job/${id}`);
      setJob(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load job details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSingleJob();
  }, [id]);

  async function fetchJobApplications() {
    try {
      const { data } = await axios.get(
        `${job_service}/api/job/application/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobApplications(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user && job && user.user_id === job.posted_by_recuriter_id) {
      fetchJobApplications();
    }
  }, [user, job]);

  const filteredApplications =
    filterStatus === "All"
      ? jobApplications
      : jobApplications.filter((app) => app.status === filterStatus);

  const updateApplicationHandler = async (applicationId: number) => {
    const value = statusMap[applicationId];
    if (!value) return toast.error("Please select a valid status");

    try {
      const { data } = await axios.put(
        `${job_service}/api/job/application/update/${applicationId}`,
        { status: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      fetchJobApplications();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const isRecruiterOwner =
    !!user && !!job && user.user_id === job.posted_by_recuriter_id;
  const isJobSeeker = user?.role === "jobseeker";
  const isOpen = job?.is_active;

  const applicationStats = useMemo(() => {
    const submitted = jobApplications.filter(
      (item) => item.status === "Submitted"
    ).length;
    const hired = jobApplications.filter(
      (item) => item.status === "Hired"
    ).length;
    const rejected = jobApplications.filter(
      (item) => item.status === "Rejected"
    ).length;

    return {
      total: jobApplications.length,
      submitted,
      hired,
      rejected,
    };
  }, [jobApplications]);

  const applyJobHandler = (jobId: number) => {
    applyJob(jobId);
  };

  if (loading) {
    return <Loading />;
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <Card className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-foreground">Job not found</h2>
            <p className="mt-2 text-muted-foreground">
              The job you are looking for may have been removed or is unavailable.
            </p>
            <Button className="mt-6" onClick={() => router.back()}>
              Go Back
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 pb-40 md:px-6 md:py-10 md:pb-48">
        <Button
          variant="ghost"
          className="mb-5 gap-2 rounded-xl px-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => router.back()}
        >
          <ArrowLeft size={17} />
          Back to jobs
        </Button>

        <Card className="mb-16 overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
          <div className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.30),_transparent_35%),linear-gradient(135deg,#081221_0%,#0b1d3a_45%,#0b2447_100%)] px-6 py-8 md:px-10 md:py-10">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:30px_30px]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100">
                    <Sparkles className="h-3.5 w-3.5" />
                    Premium Opportunity
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      job.is_active
                        ? "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/25"
                        : "bg-red-400/15 text-red-300 ring-1 ring-red-400/25"
                    }`}
                  >
                    {job.is_active ? (
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" />
                    )}
                    {job.is_active
                      ? "Open for applications"
                      : "Applications closed"}
                  </span>
                </div>

                <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
                  {job.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-300" />
                    <span className="font-medium">
                      {job.company_name || "Company Name"}
                    </span>
                    <ShieldCheck className="h-4 w-4 text-blue-300" />
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-rose-300" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-300" />
                    <span>₹{Number(job.salary).toLocaleString("en-IN")} P.A</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-violet-300" />
                    <span>{job.openings} openings</span>
                  </div>
                </div>
              </div>

              {isJobSeeker && (
                <div className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-sm font-medium text-slate-200">
                    Quick action
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Apply instantly if this role matches your profile.
                  </p>

                  <div className="mt-4">
                    {applied ? (
                      <div className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-400/15 px-5 text-sm font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                        <CheckCircle2 className="h-5 w-5" />
                        Already Applied
                      </div>
                    ) : job.is_active ? (
                      <Button
                        onClick={() => applyJobHandler(job.job_id)}
                        disabled={btnLoading}
                        className="h-12 w-full rounded-2xl text-sm font-semibold"
                      >
                        <Briefcase className="mr-2 h-4 w-4" />
                        {btnLoading ? "Applying..." : "Easy Apply"}
                      </Button>
                    ) : (
                      <div className="flex h-12 items-center justify-center rounded-2xl bg-red-400/10 px-5 text-sm font-semibold text-red-300 ring-1 ring-red-400/20">
                        Job Closed
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-4 border-b border-border bg-muted/40 p-6 md:grid-cols-4 md:p-8">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Location
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {job.location}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Salary
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                ₹{Number(job.salary).toLocaleString("en-IN")} P.A
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-950/40">
                <Users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Openings
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {job.openings} positions
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/40">
                <Clock3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Status
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {isOpen ? "Currently hiring" : "Hiring closed"}
              </p>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.5fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40">
                    <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      Job Description
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Full role overview and responsibilities
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-muted/40 p-5">
                  <p className="whitespace-pre-line text-[15px] leading-8 text-foreground">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground">
                  Why this role stands out
                </h3>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <div className="rounded-2xl border border-border bg-muted/40 p-4">
                    Premium visibility with a clean hiring workflow.
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/40 p-4">
                    Fast application process for jobseekers.
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/40 p-4">
                    Professional recruiter dashboard for status updates.
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground">
                  Quick links
                </h3>
                <div className="mt-4 space-y-3">
                  <Button
                    variant="outline"
                    className="h-11 w-full justify-between rounded-2xl"
                    onClick={() => router.back()}
                  >
                    Explore more jobs
                    <ArrowLeft className="h-4 w-4" />
                  </Button>

                  {job.company_id && (
                    <Link href={`/company/${job.company_id}`} className="block">
                      <Button
                        variant="outline"
                        className="h-11 w-full justify-between rounded-2xl"
                      >
                        View company
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {isRecruiterOwner && (
          <div className="mt-12 space-y-8">
            <div className="rounded-[28px] border border-border bg-card p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)] md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Application Management
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Review, filter, and update candidate application status.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="filter-status"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Filter
                  </label>
                  <select
                    id="filter-status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none"
                  >
                    <option value="All">All Status</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Total
                  </p>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {applicationStats.total}
                  </p>
                </div>

                <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/40 dark:bg-yellow-950/20">
                  <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700 dark:text-yellow-300">
                    Submitted
                  </p>
                  <p className="mt-2 text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                    {applicationStats.submitted}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                    Hired
                  </p>
                  <p className="mt-2 text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                    {applicationStats.hired}
                  </p>
                </div>

                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
                  <p className="text-xs font-semibold uppercase tracking-wide text-red-700 dark:text-red-300">
                    Rejected
                  </p>
                  <p className="mt-2 text-2xl font-bold text-red-800 dark:text-red-200">
                    {applicationStats.rejected}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                {jobApplications.length > 0 ? (
                  <>
                    <div className="space-y-4">
                      {filteredApplications.map((app) => (
                        <div
                          key={app.application_id}
                          className="rounded-3xl border border-border bg-muted/40 p-5"
                        >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="space-y-3">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                  app.status === "Hired"
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                                    : app.status === "Rejected"
                                    ? "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-300"
                                }`}
                              >
                                {app.status}
                              </span>

                              <div className="flex flex-wrap gap-3 text-sm">
                                <Link
                                  target="_blank"
                                  href={app.resume}
                                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 font-medium text-foreground transition hover:bg-muted"
                                >
                                  View Resume
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Link>

                                <Link
                                  target="_blank"
                                  href={`/account/${app.applicant_id}`}
                                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2 font-medium text-foreground transition hover:bg-muted"
                                >
                                  View Profile
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            </div>

                            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                              <select
                                value={statusMap[app.application_id] || ""}
                                onChange={(e) =>
                                  setStatusMap((prev) => ({
                                    ...prev,
                                    [app.application_id]: e.target.value,
                                  }))
                                }
                                className="h-11 min-w-[180px] rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none"
                              >
                                <option value="">Update status</option>
                                <option value="Submitted">Submitted</option>
                                <option value="Hired">Hired</option>
                                <option value="Rejected">Rejected</option>
                              </select>

                              <Button
                                disabled={btnLoading}
                                onClick={() =>
                                  updateApplicationHandler(app.application_id)
                                }
                                className="h-11 rounded-xl"
                              >
                                Update
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredApplications.length === 0 && (
                      <div className="rounded-3xl border border-dashed border-border bg-muted/40 py-10 text-center text-muted-foreground">
                        No application found with status <b>{filterStatus}</b>.
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-3xl border border-dashed border-border bg-muted/40 py-12 text-center text-muted-foreground">
                    No applications yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPage;