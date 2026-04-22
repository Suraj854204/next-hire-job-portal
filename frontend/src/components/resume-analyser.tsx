"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Loader2,
  Sparkles,
  ArrowRight,
  FileCheck,
  Zap,
} from "lucide-react";
import axios from "axios";
import { ResumeAnalysisResponse } from "@/type";
import { utils_service } from "@/context/AppContext";
import toast from "react-hot-toast";

const ResumeAnalyzer = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ResumeAnalysisResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      setFile(selectedFile);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const analyzeResume = async () => {
    if (!file) {
      toast.error("Please upload a resume");
      return;
    }

    setLoading(true);

    try {
      const base64 = await convertToBase64(file);

      const { data } = await axios.post(`${utils_service}/api/utils/resume-analyser`, {
        pdfBase64: base64,
      });

      setResponse(data);
      toast.success("Resume analyzed successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to analyze resume");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setFile(null);
    setResponse(null);
    setOpen(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) {
      return "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800";
    }
    if (score >= 60) {
      return "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800";
    }
    return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "high") {
      return "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800";
    }
    if (priority === "medium") {
      return "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
    }
    return "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800";
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2 text-sm font-semibold text-slate-800 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white/90">
            <Sparkles size={16} className="text-emerald-500" />
            AI-Powered ATS Analysis
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
            Analyze Your
            <span className="block bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Resume Instantly
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 md:text-lg dark:text-white/70">
            Get instant feedback on your resume, improve your ATS score, and increase your chances
            of getting shortlisted by top companies.
          </p>

          <div className="mt-8 flex justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="h-12 gap-2 rounded-xl px-8">
                  <FileText size={18} />
                  Analyze My Resume
                  <ArrowRight size={18} />
                </Button>
              </DialogTrigger>

              <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-2xl">
                {!response ? (
                  <>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-2xl">
                        <FileText className="text-primary" />
                        Upload Your Resume
                      </DialogTitle>
                      <DialogDescription>
                        Upload your resume in PDF format to get an instant ATS compatibility analysis.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 py-4">
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center transition-all duration-300 hover:border-primary"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                            <Upload size={30} className="text-primary" />
                          </div>

                          <div>
                            <p className="mb-1 break-all font-semibold text-foreground">
                              {file ? file.name : "Click to upload your resume"}
                            </p>
                            <p className="text-sm text-muted-foreground">PDF only • Maximum 5MB</p>
                          </div>

                          {file && (
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                              <CheckCircle2 size={18} />
                              <span className="text-sm font-medium">File uploaded successfully</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                      />

                      <Button
                        onClick={analyzeResume}
                        disabled={loading || !file}
                        className="h-12 w-full gap-2 rounded-xl"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Analyzing Resume...
                          </>
                        ) : (
                          <>
                            <Zap size={18} />
                            Analyze Resume
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-2xl">
                        <FileCheck className="text-primary" />
                        Your Resume Analysis
                      </DialogTitle>
                      <DialogDescription>
                        Review your ATS score, strengths, and improvement areas.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      <div className={`rounded-2xl border p-6 ${getScoreBgColor(response.atsScore)}`}>
                        <div className="text-center">
                          <p className="mb-2 text-sm font-medium text-muted-foreground">
                            ATS Compatibility Score
                          </p>
                          <div
                            className={`text-5xl font-bold md:text-6xl ${getScoreColor(
                              response.atsScore
                            )}`}
                          >
                            {response.atsScore}
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">out of 100</p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/30">
                        <p className="text-sm leading-7 text-foreground md:text-base">
                          {response.summary}
                        </p>
                      </div>

                      <div>
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                          <TrendingUp size={20} className="text-primary" />
                          Detailed Score Breakdown
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">
                          {Object.entries(response.scoreBreakdown).map(([key, value]) => (
                            <div key={key} className="rounded-2xl border border-border bg-card p-4">
                              <div className="mb-2 flex items-center justify-between gap-4">
                                <p className="capitalize font-semibold text-foreground">{key}</p>
                                <span
                                  className={`text-lg font-bold ${getScoreColor(value.score)}`}
                                >
                                  {value.score}%
                                </span>
                              </div>
                              <p className="text-sm leading-6 text-muted-foreground">
                                {value.feedback}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-950/30">
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                          <CheckCircle2
                            size={18}
                            className="text-green-600 dark:text-green-400"
                          />
                          What Your Resume Does Well
                        </h3>

                        <ul className="space-y-2">
                          {response.strengths.map((strength, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-foreground"
                            >
                              <span className="mt-0.5 text-green-600 dark:text-green-400">✓</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                          <AlertTriangle size={20} className="text-red-500" />
                          Recommendations for Improvement
                        </h3>

                        <div className="space-y-3">
                          {response.suggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className="rounded-2xl border border-border bg-card p-4"
                            >
                              <div className="mb-3 flex items-start justify-between gap-3">
                                <h4 className="text-sm font-semibold text-foreground">
                                  {suggestion.category}
                                </h4>

                                <span
                                  className={`rounded-full border px-2.5 py-1 text-xs capitalize ${getPriorityColor(
                                    suggestion.priority
                                  )}`}
                                >
                                  {suggestion.priority}
                                </span>
                              </div>

                              <div className="space-y-2 text-sm leading-6">
                                <div>
                                  <span className="font-medium text-muted-foreground">Issue: </span>
                                  <span className="text-foreground">{suggestion.issue}</span>
                                </div>

                                <div>
                                  <span className="font-medium text-muted-foreground">Fix: </span>
                                  <span className="text-foreground">
                                    {suggestion.recommendation}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button onClick={resetDialog} variant="outline" className="w-full rounded-xl">
                        Analyze Another Resume
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeAnalyzer;