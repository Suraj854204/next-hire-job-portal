"use client";

import { Card } from "@/components/ui/card";
import { Application } from "@/type";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface AppliedJobsProps {
  applications: Application[];
}

const AppliedJobs: React.FC<AppliedJobsProps> = ({ applications }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "hired":
        return {
          icon: CheckCircle2,
          color: "text-green-600",
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-500",
          bg: "bg-red-50 dark:bg-red-900/20",
          border: "border-red-200 dark:border-red-800",
        };
      default:
        return {
          icon: Clock,
          color: "text-yellow-600",
          bg: "bg-yellow-50 dark:bg-yellow-900/20",
          border: "border-yellow-200 dark:border-yellow-800",
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Applied Jobs
          </h1>
        </div>
        <p className="text-sm text-muted-foreground pl-10">
          {applications.length === 0
            ? "No applications yet"
            : `${applications.length} application${applications.length > 1 ? "s" : ""} submitted`}
        </p>
      </div>

      <Card className="overflow-hidden border shadow-sm">
        <div className="divide-y divide-border">
          {applications && applications.length > 0 ? (
            applications.map((a) => {
              const statusConfig = getStatusConfig(a.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={a.application_id}
                  className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-muted/30 flex-wrap"
                >
                  {/* Left — title + badges */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="text-base font-semibold text-foreground truncate">
                      {a.job_title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Salary */}
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        <DollarSign className="h-3 w-3" />
                        ₹ {a.job_salary}
                      </span>

                      {/* Status */}
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${statusConfig.bg} ${statusConfig.border} ${statusConfig.color}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {a.status}
                      </span>
                    </div>
                  </div>

                  {/* Right — view link */}
                  <Link
                    href={`/jobs/${a.job_id}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:border-primary/40"
                  >
                    <Eye className="h-4 w-4" />
                    View Job
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <Briefcase className="h-6 w-6 text-muted-foreground opacity-50" />
              </div>
              <p className="text-base font-semibold text-foreground">
                No applications yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                Start applying to jobs and your applications will appear here.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AppliedJobs;