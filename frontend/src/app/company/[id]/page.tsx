"use client";

import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { job_service, useAppData } from "@/context/AppContext";
import { Company, Job } from "@/type";
import axios from "axios";
import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Globe,
  Laptop,
  MapPin,
  Pencil,
  Plus,
  Sparkles,
  Users,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CompanyPage = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { user } = useAppData();

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [company, setCompany] = useState<Company | null>(null);

  const [isUpdatedModalOpen, setIsUpdatedModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const addModalRef = useRef<HTMLButtonElement>(null);

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [role, setrole] = useState("");
  const [salary, setsalary] = useState("");
  const [location, setlocation] = useState("");
  const [openings, setopenings] = useState("");
  const [job_type, setjob_type] = useState("");
  const [work_location, setwork_location] = useState("");
  const [is_active, setis_active] = useState(true);

  async function fetchCompany() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${job_service}/api/job/company/${id}`);
      setCompany(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch company details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const isRecruiterOwner =
    !!user && !!company && user.user_id === company.recruiter_id;

  const clearInput = () => {
    settitle("");
    setdescription("");
    setrole("");
    setsalary("");
    setlocation("");
    setopenings("");
    setjob_type("");
    setwork_location("");
    setis_active(true);
  };

  const addJobHandler = async () => {
    setBtnLoading(true);
    try {
      const jobData = {
        title,
        description,
        role,
        salary: Number(salary),
        location,
        openings: Number(openings),
        job_type,
        work_location,
        company_id: id,
      };

      await axios.post(`${job_service}/api/job/new`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("New job posted successfully");
      fetchCompany();
      clearInput();
      addModalRef.current?.click();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to post job");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleOpenUpdateModal = (job: Job) => {
    setSelectedJob(job);
    settitle(job.title || "");
    setdescription(job.description || "");
    setrole(job.role || "");
    setsalary(String(job.salary || ""));
    setlocation(job.location || "");
    setopenings(String(job.openings || ""));
    setjob_type(job.job_type || "");
    setwork_location(job.work_location || "");
    setis_active(job.is_active);
    setIsUpdatedModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdatedModalOpen(false);
    setSelectedJob(null);
    clearInput();
  };

  const updateJobHandler = async () => {
    if (!selectedJob) return;

    setBtnLoading(true);
    try {
      const updateData = {
        title,
        description,
        role,
        salary: Number(salary),
        location,
        openings: Number(openings),
        job_type,
        work_location,
        is_active,
      };

      await axios.put(
        `${job_service}/api/job/${selectedJob.job_id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Job updated successfully");
      fetchCompany();
      handleCloseUpdateModal();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update job");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-background">
      {company && (
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <Card className="mb-8 overflow-hidden rounded-[30px] border border-border bg-card shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_35%),linear-gradient(135deg,#081221_0%,#0b1d3a_45%,#0b2447_100%)] px-5 py-8 md:px-8 md:py-10">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:30px_30px]" />

              <div className="relative z-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="flex flex-col gap-5 md:flex-row md:items-end">
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-[26px] border-4 border-white/20 bg-white shadow-2xl md:h-32 md:w-32 dark:bg-slate-900">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                          <Building2 className="h-10 w-10" />
                        </div>
                      )}
                    </div>

                    <div className="max-w-3xl">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100">
                          <Sparkles className="h-3.5 w-3.5" />
                          Premium Company
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Verified Hiring
                        </span>
                      </div>

                      <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                        {company.name}
                      </h1>

                      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
                        {company.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {company.website && (
                      <Link href={company.website} target="_blank">
                        <Button className="h-11 rounded-2xl px-5 font-semibold">
                          <Globe className="mr-2 h-4 w-4" />
                          Visit Website
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                    <div className="mb-2 flex items-center gap-2 text-slate-200">
                      <Briefcase className="h-4 w-4 text-blue-300" />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Total Jobs
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {company.jobs?.length || 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                    <div className="mb-2 flex items-center gap-2 text-slate-200">
                      <CheckCircle className="h-4 w-4 text-emerald-300" />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Active Jobs
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {company.jobs?.filter((job) => job.is_active).length || 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                    <div className="mb-2 flex items-center gap-2 text-slate-200">
                      <Users className="h-4 w-4 text-violet-300" />
                      <span className="text-xs font-medium uppercase tracking-wide">
                        Openings
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {company.jobs?.reduce(
                        (acc, job) => acc + Number(job.openings || 0),
                        0
                      ) || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Dialog>
            <Card className="overflow-hidden rounded-[30px] border border-border bg-card shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
              <div className="border-b border-border bg-[linear-gradient(135deg,#081221_0%,#111827_100%)] p-6 text-white">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">
                        Open Positions
                      </h2>
                      <p className="text-sm text-white/70">
                        {company.jobs?.length || 0} role
                        {company.jobs?.length !== 1 ? "s" : ""} listed by this company
                      </p>
                    </div>
                  </div>

                  {isRecruiterOwner && (
                    <DialogTrigger asChild>
                      <Button className="h-11 rounded-2xl font-semibold">
                        <Plus className="mr-2 h-4 w-4" />
                        Post New Job
                      </Button>
                    </DialogTrigger>
                  )}
                </div>
              </div>

              <div className="p-5 md:p-6">
                {company.jobs && company.jobs.length > 0 ? (
                  <div className="grid gap-5">
                    {company.jobs.map((j) => (
                      <div
                        key={j.job_id}
                        className="group overflow-hidden rounded-[24px] border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div
                          className={`h-[3px] w-full ${
                            j.is_active
                              ? "bg-linear-to-r from-blue-500 via-indigo-500 to-cyan-400"
                              : "bg-border"
                          }`}
                        />

                        <div className="p-5">
                          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div className="min-w-0 flex-1">
                              <div className="mb-3 flex flex-wrap items-center gap-3">
                                <h3 className="text-xl font-bold tracking-tight text-foreground">
                                  {j.title}
                                </h3>

                                <span
                                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                                    j.is_active
                                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300"
                                      : "border border-border bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {j.is_active ? (
                                    <CheckCircle className="h-3.5 w-3.5" />
                                  ) : (
                                    <XCircle className="h-3.5 w-3.5" />
                                  )}
                                  {j.is_active ? "Active" : "Inactive"}
                                </span>
                              </div>

                              <p className="mb-4 text-sm font-medium text-muted-foreground">
                                {j.role}
                              </p>

                              <div className="grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-5">
                                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-muted-foreground">
                                  <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  <span className="truncate">
                                    {j.salary
                                      ? `₹ ${Number(j.salary).toLocaleString()}`
                                      : "Not disclosed"}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-muted-foreground">
                                  <MapPin className="h-4 w-4 text-rose-500" />
                                  <span className="truncate">{j.location}</span>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-muted-foreground">
                                  <Laptop className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  <span className="truncate">{j.work_location}</span>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-muted-foreground">
                                  <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                  <span className="truncate">{j.job_type}</span>
                                </div>

                                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-muted-foreground">
                                  <Users className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                                  <span className="truncate">
                                    {j.openings} opening{j.openings !== 1 ? "s" : ""}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex shrink-0 flex-wrap items-center gap-2">
                              <Link href={`/jobs/${j.job_id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-xl font-medium"
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Button>
                              </Link>

                              {isRecruiterOwner && (
                                <Button
                                  onClick={() => handleOpenUpdateModal(j)}
                                  variant="outline"
                                  size="sm"
                                  className="rounded-xl font-medium"
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      No jobs posted yet
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      This company has not published any open roles yet. New
                      opportunities will appear here once jobs are posted.
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-background sm:max-w-[720px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                  Post a New Job
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Job Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter job title"
                    className="h-11 rounded-xl"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Description
                  </Label>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Enter description"
                    className="h-11 rounded-xl"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Role / Department
                  </Label>
                  <Input
                    id="role"
                    type="text"
                    placeholder="Enter role"
                    className="h-11 rounded-xl"
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" /> Salary
                    </Label>
                    <Input
                      id="salary"
                      type="number"
                      placeholder="Enter salary"
                      className="h-11 rounded-xl"
                      value={salary}
                      onChange={(e) => setsalary(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="openings" className="flex items-center gap-2">
                      <Users className="h-4 w-4" /> Openings
                    </Label>
                    <Input
                      id="openings"
                      type="number"
                      placeholder="Eg. 5"
                      className="h-11 rounded-xl"
                      value={openings}
                      onChange={(e) => setopenings(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Location
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter location"
                    className="h-11 rounded-xl"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Job Type
                    </Label>
                    <Select value={job_type} onValueChange={setjob_type}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Laptop className="h-4 w-4" /> Work Location
                    </Label>
                    <Select value={work_location} onValueChange={setwork_location}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select work location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="On-site">On-site</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button ref={addModalRef} variant="outline" className="rounded-xl">
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  disabled={btnLoading}
                  onClick={addJobHandler}
                  className="rounded-xl"
                >
                  {btnLoading ? "Posting job..." : "Post Job"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isUpdatedModalOpen} onOpenChange={setIsUpdatedModalOpen}>
            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-background sm:max-w-[720px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold tracking-tight text-foreground">
                  Update Job
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 py-4">
                <div className="space-y-2">
                  <Label htmlFor="update-title" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Job Title
                  </Label>
                  <Input
                    id="update-title"
                    type="text"
                    placeholder="Enter job title"
                    className="h-11 rounded-xl"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="update-description"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" /> Description
                  </Label>
                  <Input
                    id="update-description"
                    type="text"
                    placeholder="Enter description"
                    className="h-11 rounded-xl"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="update-role" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Role / Department
                  </Label>
                  <Input
                    id="update-role"
                    type="text"
                    placeholder="Enter role"
                    className="h-11 rounded-xl"
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="update-salary" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" /> Salary
                    </Label>
                    <Input
                      id="update-salary"
                      type="number"
                      placeholder="Enter salary"
                      className="h-11 rounded-xl"
                      value={salary}
                      onChange={(e) => setsalary(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="update-openings"
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" /> Openings
                    </Label>
                    <Input
                      id="update-openings"
                      type="number"
                      placeholder="Eg. 5"
                      className="h-11 rounded-xl"
                      value={openings}
                      onChange={(e) => setopenings(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="update-location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Location
                  </Label>
                  <Input
                    id="update-location"
                    type="text"
                    placeholder="Enter location"
                    className="h-11 rounded-xl"
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> Job Type
                    </Label>
                    <Select value={job_type} onValueChange={setjob_type}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Laptop className="h-4 w-4" /> Work Location
                    </Label>
                    <Select value={work_location} onValueChange={setwork_location}>
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select work location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="On-site">On-site</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      {is_active ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                      Status
                    </Label>

                    <Select
                      value={is_active ? "true" : "false"}
                      onValueChange={(value) => setis_active(value === "true")}
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="rounded-xl">
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  disabled={btnLoading}
                  onClick={updateJobHandler}
                  className="rounded-xl"
                >
                  {btnLoading ? "Updating job..." : "Update Job"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default CompanyPage;