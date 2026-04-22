"use client";

import React, { useEffect, useState } from "react";
import { Job } from "@/type";
import { useAppData } from "@/context/AppContext";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  CheckCircle,
  CircleDollarSign,
  MapPin,
  ExternalLink,
  ShieldCheck,
  XCircle,
  Star,
  StarOff,
  Clock,
} from "lucide-react";

interface JobCardProps {
  job: Job;
  saved?: boolean;
  onToggleSave?: (id: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, saved = false, onToggleSave }) => {
  const { user, applications, applyJob, btnLoading } = useAppData();
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (applications && job.job_id) {
      setApplied(applications.some((item: any) => item.job_id === job.job_id));
    }
  }, [applications, job.job_id]);

  const isClosed = job.is_active === false;
  const isJobSeeker = user?.role === "jobseeker";
  const isRecruiter = user?.role === "recruiter";
  const showApply = isJobSeeker && !isClosed;

  return (
    <Card
      className={`
        relative flex h-full flex-col rounded-2xl border bg-background
        transition-all duration-200 overflow-hidden
        ${isClosed
          ? "opacity-60 border-border/40"
          : "border-border/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-blue-300/60 dark:hover:border-blue-700/50"
        }
      `}
    >
      {/* Accent bar */}
      <div className={`h-[2px] w-full ${isClosed ? "bg-muted" : "bg-linear-to-r from-blue-500 to-indigo-500"}`} />

      {/* Save toggle */}
      {onToggleSave && (
        <button
          onClick={() => onToggleSave(job.job_id)}
          className="absolute right-3 top-4 z-10 p-1 rounded-lg text-muted-foreground/60 hover:text-yellow-400 transition-colors"
        >
          {saved
            ? <Star className="h-[15px] w-[15px] fill-yellow-400 text-yellow-400" />
            : <StarOff className="h-[15px] w-[15px]" />
          }
        </button>
      )}

      {/* Card body */}
      <div className="flex flex-1 flex-col p-4 gap-3.5">

        {/* Row 1 — logo + status */}
        <div className="flex items-center justify-between">
          <Link
            href={`/company/${job.company_id}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-muted/40 p-1 shrink-0 hover:opacity-75 transition-opacity"
          >
            {job.company_logo
              ? <img src={job.company_logo} alt={job.company_name} className="h-full w-full object-contain" />
              : <Building2 className="h-4 w-4 text-muted-foreground" />
            }
          </Link>

          {isClosed ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-red-600 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400">
              <XCircle className="h-2.5 w-2.5" /> Closed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-950/20 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Hiring
            </span>
          )}
        </div>

        {/* Row 2 — title + company */}
        <div className="space-y-0.5 pr-5">
          <Link href={`/jobs/${job.job_id}`}>
            <h3 className="line-clamp-1 text-[14.5px] font-semibold text-foreground leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {job.title}
            </h3>
          </Link>
          <p className="flex items-center gap-1 text-[11.5px] text-muted-foreground">
            {job.company_name}
            <ShieldCheck className="h-3 w-3 text-blue-500 shrink-0" />
          </p>
        </div>

        {/* Row 3 — tags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-muted/30 px-2 py-1 text-[10.5px] font-medium text-muted-foreground">
            <MapPin className="h-2.5 w-2.5 text-blue-500" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200/70 bg-emerald-50/80 px-2 py-1 text-[10.5px] font-medium text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-950/20 dark:text-emerald-400">
            <CircleDollarSign className="h-2.5 w-2.5" />
            ₹{job.salary?.toLocaleString("en-IN")}
          </span>
          {job.job_type && (
            <span className="inline-flex items-center gap-1 rounded-md border border-blue-200/70 bg-blue-50/80 px-2 py-1 text-[10.5px] font-medium text-blue-700 dark:border-blue-800/30 dark:bg-blue-950/20 dark:text-blue-400">
              <Clock className="h-2.5 w-2.5" />
              {job.job_type}
            </span>
          )}
        </div>

        {/* Row 4 — description */}
        <p className="line-clamp-2 text-[12px] leading-relaxed text-muted-foreground/80">
          {job.description || "Explore this opportunity and see if it aligns with your skills and career goals."}
        </p>

      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-0 flex gap-2">
        <Link href={`/jobs/${job.job_id}`} className={showApply ? "flex-1" : "w-full"}>
          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 rounded-xl text-[11.5px] font-medium border-border/60"
          >
            {isRecruiter ? "View Job" : "View Details"}
            <ExternalLink className="ml-1.5 h-3 w-3" />
          </Button>
        </Link>

        {showApply && (
          applied ? (
            <div className="flex flex-1 items-center justify-center gap-1.5 h-8 rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-[11.5px] font-medium text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-950/20 dark:text-emerald-400">
              <CheckCircle className="h-3 w-3" />
              Applied
            </div>
          ) : (
            <Button
              disabled={btnLoading}
              onClick={() => applyJob(job.job_id)}
              size="sm"
              className="flex-1 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-[11.5px] font-medium"
            >
              {btnLoading ? (
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Briefcase className="mr-1 h-3 w-3" />
                  Apply Now
                </>
              )}
            </Button>
          )
        )}
      </div>
    </Card>
  );
};

export default JobCard;