"use client";

import { job_service, useAppData } from "@/context/AppContext";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import { Card } from "@/components/ui/card";
import {
  Briefcase,
  Building2,
  Eye,
  FileText,
  Globe,
  Image as ImageIcon,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Company as CompanyType } from "@/type";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Company = () => {
  const { loading } = useAppData();
  const token = Cookies.get("token");

  const addRef = useRef<HTMLButtonElement | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | number | null>(null);

  const [companies, setCompanies] = useState<CompanyType[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const openDialog = () => {
    setDialogOpen(true);
    addRef.current?.click();
  };

  const clearData = () => {
    setName("");
    setDescription("");
    setWebsite("");
    setLogo(null);
    setLogoPreview(null);
  };

  const validateForm = () => {
    if (!name.trim() || !description.trim() || !website.trim() || !logo) {
      toast.error("Please provide all company details");
      return false;
    }

    const websitePattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;
    if (!websitePattern.test(website.trim())) {
      toast.error("Please enter a valid website URL");
      return false;
    }

    return true;
  };

  const normalizeWebsite = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLogo(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    } else {
      setLogoPreview(null);
    }
  };

  const fetchCompanies = useCallback(async () => {
    try {
      setCompanyLoading(true);

      const { data } = await axios.get(`${job_service}/api/job/company/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCompanies(Array.isArray(data) ? data : []);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load companies");
    } finally {
      setCompanyLoading(false);
    }
  }, [token]);

  const addCompanyHandler = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("website", normalizeWebsite(website.trim()));
    formData.append("file", logo as File);

    try {
      setBtnLoading(true);

      const { data } = await axios.post(
        `${job_service}/api/job/company/new`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data?.message || "Company added successfully");

      if (data?.company) {
        setCompanies((prev) => [data.company, ...prev]);
      } else {
        await fetchCompanies();
      }

      clearData();
      setDialogOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to add company");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteCompany = async (id: string | number) => {
    const confirmed = window.confirm("Are you sure you want to delete this company?");
    if (!confirmed) return;

    try {
      setDeleteLoadingId(id);

      const { data } = await axios.delete(`${job_service}/api/job/company/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(data?.message || "Company deleted successfully");
      setCompanies((prev) => prev.filter((c) => c.company_id !== id));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to delete company");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  useEffect(() => {
    if (!token) {
      setCompanyLoading(false);
      toast.error("Please login first");
      return;
    }

    fetchCompanies();
  }, [token, fetchCompanies]);

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative overflow-hidden bg-[#080c18] py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-indigo-600/10 blur-[70px]" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300">
              <Sparkles className="h-3 w-3" />
              Recruiter Dashboard
            </div>

            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h1 className="text-[28px] font-semibold tracking-tight text-white md:text-[32px]">
                  My Companies
                </h1>
                <p className="mt-1.5 max-w-md text-[13px] text-white/50">
                  Register companies to post jobs and reach top candidates
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                    Slots used
                  </p>
                  <p className="mt-1 text-[24px] font-light text-white">
                    {companies.length}
                    <span className="ml-1 text-[14px] text-white/30">/3</span>
                  </p>
                </div>

                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-8 w-2 rounded-full transition-all duration-500 ${
                        i < companies.length
                          ? "bg-gradient-to-b from-blue-500 to-indigo-500"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 lg:px-8">
        {companies.length < 3 && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={openDialog}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
            >
              <Plus className="h-4 w-4" />
              Add Company
            </button>
          </div>
        )}

        <Card className="overflow-hidden border border-border/60 shadow-none">
          {companyLoading ? (
            <div className="divide-y divide-border/50">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-5">
                  <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-40 animate-pulse rounded-lg bg-muted" />
                    <div className="h-3 w-64 animate-pulse rounded-lg bg-muted" />
                    <div className="h-3 w-32 animate-pulse rounded-lg bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : companies.length > 0 ? (
            <div className="divide-y divide-border/50">
              {companies.map((company) => (
                <div
                  key={company.company_id}
                  className="flex flex-wrap items-center gap-4 px-6 py-5 transition-colors hover:bg-muted/20 sm:flex-nowrap"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border/50 bg-muted/30">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Building2 className="h-5 w-5 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="truncate text-[14px] font-semibold text-foreground">
                      {company.name}
                    </h3>

                    <p className="line-clamp-1 text-[12px] text-muted-foreground">
                      {company.description}
                    </p>

                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
                    >
                      <Globe className="h-3 w-3" />
                      {company.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Link href={`/company/${company.company_id}`}>
                      <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-border/50 bg-background text-muted-foreground transition-colors hover:border-border hover:text-foreground">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </Link>

                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-200/60 bg-red-50/50 text-red-500 transition-colors hover:bg-red-100 disabled:opacity-50 dark:border-red-800/30 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
                      disabled={deleteLoadingId === company.company_id}
                      onClick={() => deleteCompany(company.company_id)}
                    >
                      {deleteLoadingId === company.company_id ? (
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden px-6 py-20 text-center">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/4 blur-[60px]" />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-border/50 bg-muted/40">
                  <Building2 className="h-6 w-6 text-muted-foreground/40" />
                </div>

                <p className="text-[15px] font-semibold text-foreground">
                  No companies yet
                </p>

                <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
                  Add your first company to start posting jobs and reaching candidates.
                </p>

                <button
                  onClick={openDialog}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background px-4 py-2 text-[12px] font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add your first company
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Add Company Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) clearData();
        }}
      >
        <DialogTrigger asChild>
          <Button className="hidden" ref={addRef}>
            Hidden Trigger
          </Button>
        </DialogTrigger>

        <DialogContent className="rounded-2xl sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-semibold">
              Add New Company
            </DialogTitle>
            <DialogDescription className="text-[13px]">
              Fill in your company details and upload a logo to get started.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-muted/30">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-5 w-5 text-muted-foreground/40" />
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="logo"
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-border/60 bg-muted/20 px-3 py-2 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-muted"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  {logo ? logo.name : "Upload company logo"}
                </label>

                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />

                <p className="mt-1 pl-1 text-[10px] text-muted-foreground/50">
                  PNG, JPG or SVG · Square logo recommended
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                <Briefcase className="h-3 w-3" />
                Company Name
              </Label>

              <Input
                id="name"
                type="text"
                placeholder="e.g. Acme Corp"
                className="h-10 rounded-xl text-[13px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="description"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                <FileText className="h-3 w-3" />
                Description
              </Label>

              <Input
                id="description"
                type="text"
                placeholder="Brief company description"
                className="h-10 rounded-xl text-[13px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="website"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                <Globe className="h-3 w-3" />
                Website
              </Label>

              <Input
                id="website"
                type="text"
                placeholder="company.com"
                className="h-10 rounded-xl text-[13px]"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <button
              disabled={btnLoading}
              onClick={addCompanyHandler}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-[13px] font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
            >
              {btnLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add Company
                </>
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Company;