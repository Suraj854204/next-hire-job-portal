"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppData } from "@/context/AppContext";
import { AccountProps } from "@/type";
import {
  AlertTriangle,
  Briefcase,
  Camera,
  CheckCircle2,
  Crown,
  Edit3,
  FileText,
  Mail,
  NotepadText,
  Phone,
  RefreshCcw,
  Shield,
  Sparkles,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

const Info: React.FC<AccountProps> = ({ user, isYourAccount }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editRef = useRef<HTMLButtonElement | null>(null);
  const resumeRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const { updateProfilePic, updateResume, btnLoading, updateUser } = useAppData();

  const router = useRouter();

  const handleClick = () => inputRef.current?.click();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);

      const formData = new FormData();
      formData.append("file", file);
      updateProfilePic(formData);
    }

    // same file dubara select karne par bhi onChange fire ho
    e.target.value = "";
  };

  const handleEditClick = () => {
    editRef.current?.click();
    setName(user.name || "");
    setPhoneNumber(user.phone_number || "");
    setBio(user.bio || "");
  };

  const updateProfileHandler = () => {
    updateUser(name, phoneNumber, bio);
  };

  const handleResumeClick = () => resumeRef.current?.click();

  const changeResume = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file");
        e.target.value = "";
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      updateResume(formData);
    }

    e.target.value = "";
  };

  const subscriptionDate = user.subscription ? new Date(user.subscription) : null;
  const isSubscriptionActive = subscriptionDate
    ? subscriptionDate.getTime() > Date.now()
    : false;

  const initials =
    user.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const profileImage = profilePreview || user.profile_picture || "";

  useEffect(() => {
    return () => {
      if (profilePreview) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm">
        {/* Banner */}
        <div className="relative h-36 overflow-hidden bg-[#080c18]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-blue-600/20 blur-[60px]" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-indigo-600/15 blur-[50px]" />
          </div>

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {isYourAccount && (
            <button
              onClick={handleEditClick}
              className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/70 backdrop-blur-sm transition-all hover:bg-white/18 hover:text-white"
            >
              <Edit3 className="h-3 w-3" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="px-6 pb-8">
          {/* Avatar row */}
          <div className="-mt-14 mb-5 flex items-end justify-between">
            <div className="relative">
              <div className="h-[88px] w-[88px] overflow-hidden rounded-full border-[3px] border-background bg-linear-to-br from-blue-500 to-indigo-600 shadow-xl ring-1 ring-border/50">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={user.name || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xl font-semibold tracking-wide text-white">
                    {initials}
                  </div>
                )}
              </div>

              {isYourAccount && (
                <>
                  <button
                    onClick={handleClick}
                    className="absolute bottom-0.5 right-0.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-blue-600 text-white shadow-md transition-all hover:bg-blue-500"
                  >
                    <Camera className="h-3 w-3" />
                  </button>

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={inputRef}
                    onChange={changeHandler}
                  />
                </>
              )}
            </div>

            {isSubscriptionActive && (
              <span className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-amber-200/60 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 dark:border-amber-700/30 dark:bg-amber-950/30 dark:text-amber-400">
                <Crown className="h-3 w-3" />
                Premium
              </span>
            )}
          </div>

          {/* Name + role */}
          <div className="mb-5">
            <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
              {user.name}
            </h1>

            <div className="mt-1 flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" />
              <span className="capitalize">{user.role}</span>
              <span className="mx-1 text-border">·</span>
              <Shield className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-[12px] font-medium text-blue-600 dark:text-blue-400">
                Verified
              </span>
            </div>
          </div>

          {/* Bio */}
          {user.role === "jobseeker" && user.bio && (
            <div className="mb-5 rounded-2xl border border-border/50 bg-muted/20 px-4 py-3.5">
              <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <FileText className="h-3 w-3" /> About
              </p>
              <p className="text-[13px] leading-relaxed text-foreground/80">{user.bio}</p>
            </div>
          )}

          <div className="my-5 h-px bg-border/50" />

          {/* Contact */}
          <div className="mb-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Contact
            </p>

            <div className="grid gap-2.5 sm:grid-cols-2">
              {[
                { icon: Mail, label: "Email", value: user.email },
                { icon: Phone, label: "Phone", value: user.phone_number },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-border/50 bg-muted/10 px-4 py-3 transition-colors hover:border-blue-300/50 hover:bg-blue-50/30 dark:hover:border-blue-700/30 dark:hover:bg-blue-950/10"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/40">
                    <Icon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <p className="truncate text-[13px] font-medium text-foreground">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume */}
          {user.role === "jobseeker" && user.resume && (
            <>
              <div className="my-5 h-px bg-border/50" />
              <div className="mb-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Resume
                </p>

                <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-muted/10 px-4 py-3.5 transition-colors hover:border-red-300/50 dark:hover:border-red-700/30">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 dark:bg-red-950/40">
                    <NotepadText className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-foreground">Resume.pdf</p>
                    <Link
                      href={user.resume}
                      target="_blank"
                      className="text-[11px] text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
                    >
                      View document →
                    </Link>
                  </div>

                  {isYourAccount && (
                    <>
                      <button
                        onClick={handleResumeClick}
                        className="rounded-xl border border-border/60 bg-background px-3 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:border-border hover:bg-muted"
                      >
                        Update
                      </button>
                      <input
                        type="file"
                        ref={resumeRef}
                        className="hidden"
                        accept="application/pdf"
                        onChange={changeResume}
                      />
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Subscription */}
          {isYourAccount && user.role === "jobseeker" && (
            <>
              <div className="my-5 h-px bg-border/50" />
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Subscription
                </p>

                {!user.subscription ? (
                  <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-[#080c18] p-5">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-600/15 blur-[40px]" />
                    </div>

                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="mb-1 flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-blue-400" />
                          <p className="text-[13px] font-semibold text-white">Go Premium</p>
                        </div>
                        <p className="text-[12px] text-white/45">
                          Unlock AI matching, priority apply & more
                        </p>
                      </div>

                      <button
                        onClick={() => router.push("/subscribe")}
                        className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-blue-500"
                      >
                        <Crown className="h-3.5 w-3.5" />
                        Subscribe
                      </button>
                    </div>
                  </div>
                ) : isSubscriptionActive ? (
                  <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200/60 bg-emerald-50/50 px-4 py-4 dark:border-emerald-800/30 dark:bg-emerald-950/20">
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <p className="text-[13px] font-semibold text-emerald-700 dark:text-emerald-400">
                          Active Premium
                        </p>
                      </div>

                      <p className="text-[11px] text-muted-foreground">
                        Renews{" "}
                        {subscriptionDate?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white">
                      <CheckCircle2 className="h-3 w-3" />
                      Active
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-red-200/60 bg-red-50/50 px-4 py-4 dark:border-red-800/30 dark:bg-red-950/20">
                    <div>
                      <div className="mb-1 flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <p className="text-[13px] font-semibold text-red-700 dark:text-red-400">
                          Subscription Expired
                        </p>
                      </div>

                      <p className="text-[11px] text-muted-foreground">
                        Expired{" "}
                        {subscriptionDate?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <button
                      onClick={() => router.push("/subscribe")}
                      className="flex items-center gap-1.5 rounded-xl border border-red-300 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-red-700/40 dark:bg-red-950/30 dark:text-red-400"
                    >
                      <RefreshCcw className="h-3 w-3" />
                      Renew
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={editRef} className="hidden">
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent className="rounded-2xl sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle className="text-[17px] font-semibold">Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                <UserIcon className="h-3 w-3" /> Full Name
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                className="h-10 rounded-xl text-[13px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                <Phone className="h-3 w-3" /> Phone
              </Label>
              <Input
                id="phone"
                type="number"
                placeholder="Phone number"
                className="h-10 rounded-xl text-[13px]"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {user.role === "jobseeker" && (
              <div className="space-y-1.5">
                <Label
                  htmlFor="bio"
                  className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  <FileText className="h-3 w-3" /> Bio
                </Label>
                <Input
                  id="bio"
                  placeholder="Professional summary"
                  className="h-10 rounded-xl text-[13px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            )}
          </div>

          <DialogFooter className="mt-2">
            <Button
              disabled={btnLoading}
              onClick={updateProfileHandler}
              className="h-10 w-full rounded-xl bg-blue-600 text-[13px] font-semibold hover:bg-blue-700"
            >
              {btnLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Info;