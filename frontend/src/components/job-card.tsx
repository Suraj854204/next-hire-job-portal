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

const JobCard: React.FC<JobCardProps> = ({
  job,
  saved = false,
  onToggleSave,
}) => {
  const { user, applications, applyJob, applyingJobIds } = useAppData();
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (applications && job.job_id) {
      setApplied(applications.some((item) => item.job_id === job.job_id));
    }
  }, [applications, job.job_id]);

  const isClosed = job.is_active === false;
  const isJobSeeker = user?.role === "jobseeker";
  const isRecruiter = user?.role === "recruiter";
  const showApply = isJobSeeker && !isClosed;
  const isApplying = applyingJobIds.has(job.job_id);

  return (
    <Card
      className={`
        group relative flex h-full flex-col rounded-2xl overflow-hidden
        border transition-all duration-300
        bg-white dark:bg-[#0f1117]

        ${
          isClosed
            ? "opacity-50 border-zinc-200 dark:border-zinc-800"
            : `
              border-zinc-200/80 dark:border-zinc-800/80
              hover:-translate-y-1
              hover:shadow-lg hover:shadow-blue-500/10
              dark:hover:shadow-blue-400/10
              hover:border-blue-300/60 dark:hover:border-blue-700/40
            `
        }
      `}
    >
      {/* 🔥 Premium Hover Accent Line */}
      <div className="absolute top-0 left-0 h-[2px] w-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

      {/* ⭐ Save Button */}
      {onToggleSave && (
        <button
          onClick={() => onToggleSave(job.job_id)}
          className="absolute right-3.5 top-4 z-10 p-1 rounded-lg text-zinc-300 dark:text-zinc-600 hover:text-amber-400 transition-all duration-200 hover:scale-110"
        >
          {saved ? (
            <Star className="h-[15px] w-[15px] fill-amber-400 text-amber-400" />
          ) : (
            <StarOff className="h-[15px] w-[15px]" />
          )}
        </button>
      )}

      {/* BODY */}
      <div className="flex flex-1 flex-col px-5 pt-4 pb-3 gap-4">

        {/* Logo + Status */}
        <div className="flex items-center justify-between">
          <Link
            href={`/company/${job.company_id}`}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-1.5 shadow-sm"
          >
            {job.company_logo ? (
              <img
                src={job.company_logo}
                alt={job.company_name}
                className="h-full w-full object-contain"
              />
            ) : (
              <Building2 className="h-4 w-4 text-zinc-400" />
            )}
          </Link>

          {isClosed ? (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] bg-red-100 text-red-500">
              <XCircle className="h-3 w-3" />
              Closed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] bg-emerald-100 text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Hiring
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <Link href={`/jobs/${job.job_id}`}>
            <h3 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 transition">
              {job.title}
            </h3>
          </Link>
          <p className="flex items-center gap-1 text-[12px] text-zinc-400">
            {job.company_name}
            <ShieldCheck className="h-3 w-3 text-blue-500" />
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <MapPin className="h-3 w-3 text-blue-500" />
            {job.location}
          </span>

          <span className="flex items-center gap-1 text-xs text-emerald-600">
            <CircleDollarSign className="h-3 w-3" />
            ₹{job.salary?.toLocaleString("en-IN")}
          </span>

          {job.job_type && (
            <span className="flex items-center gap-1 text-xs text-blue-600">
              <Clock className="h-3 w-3" />
              {job.job_type}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[12px] text-zinc-400 line-clamp-2">
          {job.description ||
            "Explore this opportunity and grow your career."}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex gap-2">
        <Link href={`/jobs/${job.job_id}`} className="flex-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 text-xs"
          >
            View Details
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </Link>

        {showApply &&
          (applied ? (
            <div className="flex-1 flex items-center justify-center text-xs text-emerald-600 border rounded-xl">
              <CheckCircle className="h-3 w-3 mr-1" />
              Applied
            </div>
          ) : (
            <Button
              onClick={() => applyJob(job.job_id)}
              size="sm"
              className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-500"
            >
              <Briefcase className="mr-1 h-3 w-3" />
              Apply
            </Button>
          ))}
      </div>
    </Card>
  );
};

export default JobCard;