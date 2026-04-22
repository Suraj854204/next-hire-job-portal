"use client";

import { auth_service, useAppData } from "@/context/AppContext";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  FileText,
  Lock,
  Mail,
  Phone,
  UploadCloud,
  User,
  Building2,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/loading";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const { isAuth, setUser, loading, setIsAuth } = useAppData();

  if (loading) return <Loading />;
  if (isAuth) return redirect("/");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!role) {
      toast.error("Please select a role");
      return;
    }

    if (role === "jobseeker" && !bio.trim()) {
      toast.error("Please enter your professional summary");
      return;
    }

    setBtnLoading(true);

    try {
      const formData = new FormData();
      formData.append("role", role);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phoneNumber", phoneNumber);

      if (role === "jobseeker") {
        formData.append("bio", bio);
        if (resume) formData.append("file", resume);
      }

      const { data } = await axios.post(
        `${auth_service}/api/auth/register`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(data?.message || "Registered successfully");

      if (data?.token) {
        Cookies.set("token", data.token, { expires: 15, secure: false, path: "/" });
      }

      setUser(data?.registeredUser || null);
      setIsAuth(true);

      setName(""); setRole(""); setPhoneNumber(""); setBio("");
      setResume(null); setEmail(""); setPassword("");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error?.message || "Registration failed. Try again."
      );
      setIsAuth(false);
    } finally {
      setBtnLoading(false);
    }
  };

  const inputClass =
    "h-11 pl-9 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <div className="min-h-screen bg-background px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-xl space-y-8">

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Free to join
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join NextHire and unlock a smarter hiring experience.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <form onSubmit={submitHandler} className="space-y-6">

            {/* Role selector */}
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-foreground">
                  I want to join as a…
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Choose how you'll use NextHire
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Job Seeker */}
                <button
                  type="button"
                  onClick={() => setRole("jobseeker")}
                  className={`relative rounded-xl border-2 p-4 text-left transition-all duration-150 ${
                    role === "jobseeker"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/40 hover:bg-muted/30"
                  }`}
                >
                  {role === "jobseeker" && (
                    <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-primary" />
                  )}
                  <div className={`mb-2 inline-flex rounded-lg p-2 ${
                    role === "jobseeker" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    <User className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Job Seeker</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Find jobs & upload resume
                  </p>
                </button>

                {/* Recruiter */}
                <button
                  type="button"
                  onClick={() => setRole("recruiter")}
                  className={`relative rounded-xl border-2 p-4 text-left transition-all duration-150 ${
                    role === "recruiter"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/40 hover:bg-muted/30"
                  }`}
                >
                  {role === "recruiter" && (
                    <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-primary" />
                  )}
                  <div className={`mb-2 inline-flex rounded-lg p-2 ${
                    role === "recruiter" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    <Building2 className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Employer</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Post jobs & hire talent
                  </p>
                </button>
              </div>
            </div>

            {/* Fields – shown after role is selected */}
            {role && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground font-medium">Account details</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`${inputClass} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Phone number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Job Seeker extras */}
                {role === "jobseeker" && (
                  <div className="space-y-4 rounded-xl border border-border bg-muted/20 p-5">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Jobseeker profile</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Stand out to employers with a complete profile
                      </p>
                    </div>

                    {/* Resume upload */}
                    <div className="space-y-1.5">
                      <Label htmlFor="resume" className="text-sm font-medium text-foreground">
                        Resume (PDF)
                      </Label>
                      <label
                        htmlFor="resume"
                        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-background px-4 py-5 text-center transition-colors hover:border-primary/50 hover:bg-muted/30"
                      >
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          <UploadCloud className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {resume ? resume.name : "Click to upload your resume"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">PDF only</p>
                        </div>
                        {resume && (
                          <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                            <FileText className="h-3 w-3" />
                            File selected
                          </div>
                        )}
                        <Input
                          id="resume"
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => setResume(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Bio */}
                    <div className="space-y-1.5">
                      <Label htmlFor="bio" className="text-sm font-medium text-foreground">
                        Professional summary
                      </Label>
                      <textarea
                        id="bio"
                        placeholder="Describe your skills, experience, and career goals..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        required={role === "jobseeker"}
                        rows={4}
                        className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-primary"
                      />
                      <p className="text-xs text-muted-foreground">
                        {bio.length}/500 characters — a strong summary improves visibility
                      </p>
                    </div>
                  </div>
                )}

                {/* Recruiter extras */}
                {role === "recruiter" && (
                  <div className="rounded-xl border border-border bg-muted/20 p-5">
                    <p className="text-sm font-semibold text-foreground">Employer profile</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      Your employer account lets you post jobs, review applications, and connect with top candidates — all in one place.
                    </p>
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={btnLoading}
                  className="w-full h-11 rounded-xl font-semibold gap-2"
                >
                  {btnLoading ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline underline-offset-4 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;