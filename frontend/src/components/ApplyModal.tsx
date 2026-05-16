"use client";

import React, { useState, useRef } from "react";
import { Job } from "@/type";
import {
  X,
  Building2,
  MapPin,
  CircleDollarSign,
  Clock,
  Upload,
  CheckCircle,
  Briefcase,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApplyModalProps {
  job: Job;
  open: boolean;
  onClose: () => void;
  onApply: (jobId: number) => Promise<void>;
}

type Step = "form" | "submitting" | "success";

const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  open,
  onClose,
  onApply,
}) => {
  const [step, setStep] = useState<Step>("form");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email required";
    if (!form.phone.trim() || form.phone.length < 10)
      newErrors.phone = "Valid phone required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStep("submitting");
    await onApply(job.job_id);
    setStep("success");
  };

  const handleClose = () => {
    setStep("form");
    setForm({ fullName: "", email: "", phone: "", coverLetter: "" });
    setErrors({});
    setFileName(null);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        onClick={handleClose}
      >
        {/* Modal */}
        <div
          className="relative bg-white dark:bg-[#0f1117] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            <X className="h-4 w-4" />
          </button>

          {/* ── FORM VIEW ── */}
          {(step === "form" || step === "submitting") && (
            <>
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-500 px-6 pt-6 pb-8 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/5" />
                <div className="absolute -bottom-6 left-10 h-20 w-20 rounded-full bg-white/5" />

                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 border border-white/20">
                    {job.company_logo ? (
                      <img
                        src={job.company_logo}
                        alt={job.company_name}
                        className="h-6 w-6 object-contain"
                      />
                    ) : (
                      <Building2 className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-white/70 text-[11px] tracking-wider uppercase">
                      {job.company_name}
                    </p>
                    <p className="text-white font-semibold text-sm leading-tight">
                      {job.title}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10">
                  <span className="flex items-center gap-1 text-[11px] text-white/80 bg-white/15 px-2.5 py-1 rounded-full">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-white/80 bg-white/15 px-2.5 py-1 rounded-full">
                    <CircleDollarSign className="h-3 w-3" />
                    ₹{job.salary?.toLocaleString("en-IN")}
                  </span>
                  {job.job_type && (
                    <span className="flex items-center gap-1 text-[11px] text-white/80 bg-white/15 px-2.5 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      {job.job_type}
                    </span>
                  )}
                </div>
              </div>

              {/* Accent line below header */}
              <div className="h-[2px] bg-gradient-to-r from-blue-500 via-indigo-400 to-violet-500" />

              {/* Form Body */}
              <div className="px-6 py-5 space-y-4 max-h-[55vh] overflow-y-auto">
                <p className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-200">
                  Your Application
                </p>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    placeholder="Rahul Sharma"
                    className={`w-full rounded-xl border text-sm px-3 py-2.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none transition-all
                      ${errors.fullName
                        ? "border-red-400 focus:border-red-500"
                        : "border-zinc-200 dark:border-zinc-800 focus:border-blue-500 dark:focus:border-blue-400"
                      }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500">{errors.fullName}</p>
                  )}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="rahul@email.com"
                      className={`w-full rounded-xl border text-sm px-3 py-2.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none transition-all
                        ${errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-zinc-200 dark:border-zinc-800 focus:border-blue-500 dark:focus:border-blue-400"
                        }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                      className={`w-full rounded-xl border text-sm px-3 py-2.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none transition-all
                        ${errors.phone
                          ? "border-red-400 focus:border-red-500"
                          : "border-zinc-200 dark:border-zinc-800 focus:border-blue-500 dark:focus:border-blue-400"
                        }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Resume / CV
                  </label>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full flex items-center gap-3 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-500 px-4 py-3 transition-all group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950 group-hover:bg-blue-100 transition-colors">
                      <Upload className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                        {fileName ? fileName : "Upload your resume"}
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        PDF, DOC up to 5MB
                      </p>
                    </div>
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Cover Letter */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Cover Letter{" "}
                    <span className="text-zinc-300 dark:text-zinc-600">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={form.coverLetter}
                    onChange={(e) =>
                      setForm({ ...form, coverLetter: e.target.value })
                    }
                    rows={3}
                    placeholder="Tell us why you're a great fit for this role..."
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 dark:focus:border-blue-400 text-sm px-3 py-2.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none resize-none transition-all"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClose}
                  className="flex-1 h-9 text-xs"
                  disabled={step === "submitting"}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={step === "submitting"}
                  className="flex-1 h-9 text-xs bg-blue-600 hover:bg-blue-500 text-white"
                >
                  {step === "submitting" ? (
                    <>
                      <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Briefcase className="mr-1.5 h-3.5 w-3.5" />
                      Submit Application
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          {/* ── SUCCESS VIEW ── */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center px-8 py-14 text-center animate-in fade-in zoom-in-95 duration-500">
              {/* Animated ring */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Application Sent! 🎉
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                You applied for{" "}
                <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                  {job.title}
                </span>
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                at{" "}
                <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                  {job.company_name}
                </span>
              </p>

              <div className="w-full rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 px-4 py-3 mb-8 text-left space-y-1.5">
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  What's Next?
                </p>
                {[
                  "Recruiter will review your application",
                  "You'll be contacted within 3–5 business days",
                  "Check your email for updates",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleClose}
                className="w-full h-9 text-sm bg-blue-600 hover:bg-blue-500 text-white"
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplyModal;