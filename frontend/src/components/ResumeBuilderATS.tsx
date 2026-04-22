"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Award,
  Briefcase,
  Download,
  FileText,
  GraduationCap,
  Palette,
  Plus,
  Sparkles,
  Trash2,
  Trophy,
  User,
  Wrench,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type EducationItem = {
  degree: string;
  college: string;
  branch: string;
  startYear: string;
  endYear: string;
  cgpa: string;
};

type ExperienceItem = {
  role: string;
  company: string;
  duration: string;
  description: string;
};

type ProjectItem = {
  title: string;
  techStack: string;
  description: string;
  github: string;
  liveLink: string;
};

type CertificationItem = {
  title: string;
  platform: string;
  year: string;
};

const emptyEdu = (): EducationItem => ({
  degree: "",
  college: "",
  branch: "",
  startYear: "",
  endYear: "",
  cgpa: "",
});

const emptyExp = (): ExperienceItem => ({
  role: "",
  company: "",
  duration: "",
  description: "",
});

const emptyProj = (): ProjectItem => ({
  title: "",
  techStack: "",
  description: "",
  github: "",
  liveLink: "",
});

const emptyCert = (): CertificationItem => ({
  title: "",
  platform: "",
  year: "",
});

const suggestedSkills = [
  "Java",
  "Spring Boot",
  "React",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "MongoDB",
  "SQL",
  "Docker",
  "AWS",
  "REST API",
  "Git",
  "DSA",
  "Microservices",
];

const accentOptions = [
  { name: "Blue", value: "#2563eb" },
  { name: "Violet", value: "#7c3aed" },
  { name: "Emerald", value: "#059669" },
  { name: "Rose", value: "#e11d48" },
  { name: "Amber", value: "#d97706" },
  { name: "Slate", value: "#334155" },
];

const Section = ({
  icon: Icon,
  title,
  children,
  right,
  dark,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
  dark: boolean;
}) => {
  return (
    <div
      className={`rounded-3xl border p-4 md:p-5 ${
        dark ? "border-white/10 bg-[#111111]" : "border-slate-200 bg-white"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
              dark ? "bg-white/10" : "bg-slate-100"
            }`}
          >
            <Icon size={18} className={dark ? "text-white" : "text-slate-700"} />
          </div>
          <h3 className={`text-base font-semibold ${dark ? "text-white" : "text-slate-900"}`}>
            {title}
          </h3>
        </div>
        {right}
      </div>
      {children}
    </div>
  );
};

const Field = ({
  label,
  children,
  dark,
}: {
  label: string;
  children: React.ReactNode;
  dark: boolean;
}) => {
  return (
    <div className="space-y-1.5">
      <Label
        className={`text-xs font-semibold uppercase tracking-wide ${
          dark ? "text-white/60" : "text-slate-500"
        }`}
      >
        {label}
      </Label>
      {children}
    </div>
  );
};

const improveBulletText = (text: string) => {
  const value = text.trim();
  if (!value) return "";

  const cleaned = text.replace(/\.+$/, "").trim();
  const first = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  if (
    /developed|built|designed|optimized|implemented|created|led|improved|integrated|reduced|increased/i.test(
      first
    )
  ) {
    return `${first}.`;
  }

  return `Built ${first.charAt(0).toLowerCase() + first.slice(1)}.`;
};

const improveSummaryText = (summary: string, fullName: string, skills: string[]) => {
  if (summary.trim()) return summary.trim();

  const topSkills = skills.slice(0, 6).join(", ");
  return `${fullName || "Candidate"} is a motivated software developer with hands-on experience in ${
    topSkills || "modern web development"
  }. Skilled at building clean, scalable, and ATS-friendly projects with strong problem-solving ability and a focus on real-world impact.`;
};

const ResumeBlock = ({
  title,
  children,
  paperMode,
}: {
  title: string;
  children: React.ReactNode;
  paperMode: "light" | "dark";
}) => {
  const isDark = paperMode === "dark";

  return (
    <div style={{ marginBottom: "10px", pageBreakInside: "avoid", breakInside: "avoid" }}>
      <h2
        style={{
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          borderBottom: `1px solid ${isDark ? "#e5e7eb" : "#111827"}`,
          paddingBottom: "4px",
          marginBottom: "6px",
          color: isDark ? "#f8fafc" : "#111827",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
};

const sanitizeCloneForPdf = (source: HTMLElement, paperMode: "light" | "dark") => {
  const clone = source.cloneNode(true) as HTMLElement;

  const safeText = paperMode === "dark" ? "#f8fafc" : "#111827";
  const safeSub = paperMode === "dark" ? "#d1d5db" : "#374151";
  const safeBg = paperMode === "dark" ? "#0b0b0b" : "#ffffff";

  clone.removeAttribute("id");
  clone.style.width = "794px";
  clone.style.minHeight = "1123px";
  clone.style.background = safeBg;
  clone.style.color = safeText;
  clone.style.fontFamily = "Arial, Helvetica, sans-serif";
  clone.style.boxSizing = "border-box";
  clone.style.margin = "0";
  clone.style.padding = "52px";
  clone.style.borderRadius = "0";
  clone.style.boxShadow = "none";

  const all = clone.querySelectorAll("*");
  all.forEach((el) => {
    const htmlEl = el as HTMLElement;
    htmlEl.removeAttribute("class");
    htmlEl.removeAttribute("data-slot");
    htmlEl.style.boxShadow = "none";
    htmlEl.style.filter = "none";
    htmlEl.style.backdropFilter = "none";
    htmlEl.style.textShadow = "none";

    const currentColor = htmlEl.style.color;
    const currentBg = htmlEl.style.background;
    const currentBgColor = htmlEl.style.backgroundColor;

    if (currentColor && /(oklch|oklab|lab|lch)\(/i.test(currentColor)) {
      htmlEl.style.color = safeText;
    }
    if (currentBg && /(oklch|oklab|lab|lch)\(/i.test(currentBg)) {
      htmlEl.style.background = "transparent";
    }
    if (currentBgColor && /(oklch|oklab|lab|lch)\(/i.test(currentBgColor)) {
      htmlEl.style.backgroundColor = "transparent";
    }
  });

  clone.querySelectorAll("p, span, li, a").forEach((el) => {
    (el as HTMLElement).style.color = safeText;
  });

  clone.querySelectorAll("h1, h2, h3, h4, h5, h6, strong, b").forEach((el) => {
    const node = el as HTMLElement;
    node.style.color = safeText;
    node.style.fontWeight = "700";
  });

  const smallTexts = clone.querySelectorAll('[style*="10px"], [style*="10.5px"], [style*="10.8px"]');
  smallTexts.forEach((el) => {
    (el as HTMLElement).style.color = safeSub;
  });

  return clone;
};

const createPdfPage = (
  pageWidthPx: number,
  pageHeightPx: number,
  paddingPx: number,
  background: string,
  color: string
) => {
  const page = document.createElement("div");
  page.style.width = `${pageWidthPx}px`;
  page.style.height = `${pageHeightPx}px`;
  page.style.minHeight = `${pageHeightPx}px`;
  page.style.boxSizing = "border-box";
  page.style.padding = `${paddingPx}px`;
  page.style.background = background;
  page.style.color = color;
  page.style.fontFamily = "Arial, Helvetica, sans-serif";
  page.style.overflow = "hidden";
  page.style.position = "relative";
  return page;
};

const exportElementToPdf = async (
  source: HTMLElement,
  fileName: string,
  paperMode: "light" | "dark"
) => {
  const safeBg = paperMode === "dark" ? "#0b0b0b" : "#ffffff";
  const safeText = paperMode === "dark" ? "#f8fafc" : "#111827";

  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-100000px";
  wrapper.style.top = "0";
  wrapper.style.width = "794px";
  wrapper.style.background = safeBg;
  wrapper.style.zIndex = "-1";
  wrapper.style.pointerEvents = "none";
  wrapper.style.opacity = "1";

  const clone = sanitizeCloneForPdf(source, paperMode);
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  try {
    const pageWidthPx = 794;
    const pageHeightPx = 1123;
    const pagePaddingPx = 52;
    const pageInnerHeightPx = pageHeightPx - pagePaddingPx * 2;

    const pdf = new jsPDF("p", "mm", "a4");
    const pages: HTMLElement[] = [];

    const rootChildren = Array.from(clone.children) as HTMLElement[];

    let currentPage = createPdfPage(pageWidthPx, pageHeightPx, pagePaddingPx, safeBg, safeText);
    let currentHeight = 0;

    const measureNodeHeight = (node: HTMLElement) => {
      const tempPage = createPdfPage(pageWidthPx, pageHeightPx, pagePaddingPx, safeBg, safeText);
      tempPage.style.position = "absolute";
      tempPage.style.left = "-100000px";
      tempPage.style.top = "0";
      tempPage.style.visibility = "hidden";

      const measuredNode = node.cloneNode(true) as HTMLElement;
      tempPage.appendChild(measuredNode);
      wrapper.appendChild(tempPage);
      const height = measuredNode.offsetHeight;
      wrapper.removeChild(tempPage);
      return height;
    };

    const pushCurrentPage = () => {
      if (currentPage.childElementCount > 0) {
        pages.push(currentPage);
        currentPage = createPdfPage(pageWidthPx, pageHeightPx, pagePaddingPx, safeBg, safeText);
        currentHeight = 0;
      }
    };

    for (const child of rootChildren) {
      const childClone = child.cloneNode(true) as HTMLElement;
      const childHeight = measureNodeHeight(childClone);

      if (currentHeight + childHeight <= pageInnerHeightPx) {
        currentPage.appendChild(childClone);
        currentHeight += childHeight;
        continue;
      }

      if (childHeight <= pageInnerHeightPx) {
        pushCurrentPage();
        currentPage.appendChild(childClone);
        currentHeight += childHeight;
        continue;
      }

      // oversize block split
      const sectionClone = child.cloneNode(false) as HTMLElement;
      const sectionChildren = Array.from(child.children) as HTMLElement[];

      let partialSection = sectionClone.cloneNode(false) as HTMLElement;
      let partialPlaced = false;

      for (const innerChild of sectionChildren) {
        const testSection = partialSection.cloneNode(true) as HTMLElement;
        testSection.appendChild(innerChild.cloneNode(true) as HTMLElement);

        const testHeight = measureNodeHeight(testSection);

        if (currentHeight + testHeight <= pageInnerHeightPx) {
          partialSection.appendChild(innerChild.cloneNode(true) as HTMLElement);
          partialPlaced = true;
        } else {
          if (partialSection.childElementCount > 0) {
            currentPage.appendChild(partialSection);
            pushCurrentPage();
          } else {
            pushCurrentPage();
          }

          partialSection = sectionClone.cloneNode(false) as HTMLElement;
          partialSection.appendChild(innerChild.cloneNode(true) as HTMLElement);
          partialPlaced = true;

          const newHeight = measureNodeHeight(partialSection);
          if (newHeight > pageInnerHeightPx) {
            currentPage.appendChild(partialSection);
            pushCurrentPage();
            partialSection = sectionClone.cloneNode(false) as HTMLElement;
            partialPlaced = false;
          }
        }
      }

      if (partialPlaced && partialSection.childElementCount > 0) {
        const partialHeight = measureNodeHeight(partialSection);
        if (currentHeight + partialHeight > pageInnerHeightPx) {
          pushCurrentPage();
        }
        currentPage.appendChild(partialSection);
        currentHeight += partialHeight;
      }
    }

    pushCurrentPage();

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      wrapper.appendChild(page);

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        backgroundColor: safeBg,
        logging: false,
        allowTaint: true,
        windowWidth: pageWidthPx,
        windowHeight: pageHeightPx,
      });

      wrapper.removeChild(page);

      const imgData = canvas.toDataURL("image/png");
      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    }

    pdf.save(fileName);
  } finally {
    document.body.removeChild(wrapper);
  }
};

const ResumeBuilderATS = () => {
  const resumeRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [accentColor, setAccentColor] = useState("#2563eb");
  const [paperMode, setPaperMode] = useState<"light" | "dark">("light");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [summary, setSummary] = useState("");

  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const [education, setEducation] = useState<EducationItem[]>([emptyEdu()]);
  const [experience, setExperience] = useState<ExperienceItem[]>([emptyExp()]);
  const [projects, setProjects] = useState<ProjectItem[]>([emptyProj()]);
  const [certifications, setCertifications] = useState<CertificationItem[]>([emptyCert()]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateItem = <T,>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    index: number,
    field: keyof T,
    value: string
  ) => {
    setter((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const addItem = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, item: T) => {
    setter((prev) => [...prev, item]);
  };

  const removeItem = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const addSkill = (value?: string) => {
    const finalSkill = (value ?? currentSkill).trim();
    if (!finalSkill) return;

    const exists = skills.some((skill) => skill.toLowerCase() === finalSkill.toLowerCase());
    if (exists) {
      toast.error("Skill already added");
      return;
    }

    setSkills((prev) => [...prev, finalSkill]);
    setCurrentSkill("");
  };

  const addAchievement = () => {
    const value = currentAchievement.trim();
    if (!value) return;

    const exists = achievements.some((item) => item.toLowerCase() === value.toLowerCase());
    if (exists) {
      toast.error("Achievement already added");
      return;
    }

    setAchievements((prev) => [...prev, value]);
    setCurrentAchievement("");
  };

  const previewData = useMemo(() => {
    return {
      fullName: fullName.trim() || "Your Name",
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      linkedin: linkedin.trim(),
      github: github.trim(),
      portfolio: portfolio.trim(),
      summary: improveSummaryText(summary, fullName, skills),
      skills,
      education: education.filter((item) => item.degree || item.college || item.branch),
      experience: experience
        .filter((item) => item.role || item.company || item.description)
        .map((item) => ({ ...item, description: improveBulletText(item.description) })),
      projects: projects
        .filter((item) => item.title || item.description)
        .map((item) => ({ ...item, description: improveBulletText(item.description) })),
      certifications: certifications.filter((item) => item.title || item.platform || item.year),
      achievements,
    };
  }, [
    achievements,
    certifications,
    education,
    email,
    experience,
    fullName,
    github,
    linkedin,
    location,
    phone,
    portfolio,
    projects,
    skills,
    summary,
  ]);

  const atsScore = useMemo(() => {
    let score = 0;
    if (fullName.trim()) score += 10;
    if (email.trim()) score += 10;
    if (phone.trim()) score += 10;
    if (location.trim()) score += 5;
    if (summary.trim()) score += 15;
    if (skills.length >= 5) score += 15;
    if (education.some((e) => e.degree || e.college)) score += 10;
    if (projects.some((p) => p.title || p.description)) score += 10;
    if (experience.some((e) => e.role || e.company || e.description)) score += 10;
    if (achievements.length > 0 || certifications.some((c) => c.title)) score += 5;
    return Math.min(score, 100);
  }, [
    achievements.length,
    certifications,
    education,
    email,
    experience,
    fullName,
    location,
    phone,
    projects,
    skills.length,
    summary,
  ]);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) {
      toast.error("Resume preview not found");
      return;
    }

    try {
      setIsDownloading(true);

      const fileName = `${(fullName.trim() || "resume")
        .replace(/\s+/g, "_")
        .replace(/[^\w-]/g, "")}_ATS_Resume.pdf`;

      await exportElementToPdf(resumeRef.current, fileName, paperMode);
      toast.success("Resume PDF downloaded successfully");
    } catch (error) {
      console.error("PDF download error:", error);
      toast.error("PDF download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleImproveSummary = () => {
    setSummary(improveSummaryText(summary, fullName, skills));
    toast.success("Summary improved");
  };

  const resetAll = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setLinkedin("");
    setGithub("");
    setPortfolio("");
    setSummary("");
    setSkills([]);
    setCurrentSkill("");
    setEducation([emptyEdu()]);
    setExperience([emptyExp()]);
    setProjects([emptyProj()]);
    setCertifications([emptyCert()]);
    setAchievements([]);
    setCurrentAchievement("");
    toast.success("Form reset");
  };

  const dark = mounted && resolvedTheme === "dark";
  const paperIsDark = paperMode === "dark";

  const pageBg = dark ? "#020b2d" : "#f8fafc";
  const surfaceBg = dark ? "#111111" : "#ffffff";
  const previewOuterBg = dark ? "#111111" : "#e2e8f0";
  const heroSectionBg = dark ? "#020617" : "#f8fafc";
  const heroTitleColor = dark ? "#ffffff" : "#0f172a";
  const heroTextColor = dark ? "text-white/65" : "text-slate-600";

  const paperBg = paperIsDark ? "#0b0b0b" : "#ffffff";
  const paperText = paperIsDark ? "#f8fafc" : "#111827";
  const paperSub = paperIsDark ? "#d1d5db" : "#374151";

  if (!mounted) return null;

  return (
    <section className="relative py-16 md:py-20" style={{ backgroundColor: heroSectionBg }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[280px] w-[280px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -right-20 top-20 h-[260px] w-[260px] rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl items-start justify-center px-4 py-2 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl text-center">
          <div
            className={`mx-auto inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold ${
              dark ? "border-white/10 bg-white/5 text-white/80" : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            <Sparkles size={16} />
            AI-Powered Resume Builder
          </div>

          <h2
            className="mt-4 text-3xl font-bold tracking-tight md:text-5xl"
            style={{ color: heroTitleColor }}
          >
            Build the perfect
            <span className="block bg-gradient-to-r from-purple-500 via-rose-400 to-cyan-500 bg-clip-text text-transparent">
              ATS resume for you
            </span>
          </h2>

          <p className={`mx-auto mt-4 max-w-xl text-base md:text-lg ${heroTextColor}`}>
            Create a professional, ATS-friendly resume with clean formatting, strong content, and
            a structure that gets you noticed.
          </p>

          <div className="mt-12 flex items-center justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="h-12 gap-2 rounded-xl px-10">
                  <Sparkles size={18} />
                  Build resume now
                </Button>
              </DialogTrigger>

              <DialogContent
                className="fixed inset-0 left-0 top-0 z-50 h-screen w-screen !max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-none border-0 p-0 shadow-none"
                style={{ backgroundColor: pageBg }}
              >
                <DialogTitle className="sr-only">Resume Builder</DialogTitle>
                <DialogDescription className="sr-only">
                  Create and preview an ATS friendly resume and download it as a PDF.
                </DialogDescription>

                <section className="min-h-screen py-6" style={{ backgroundColor: pageBg }}>
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                      className={`mb-6 rounded-[28px] border p-5 md:p-6 ${
                        dark ? "border-white/10 text-white" : "border-slate-200 text-slate-900"
                      }`}
                      style={{ backgroundColor: surfaceBg }}
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <div
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${
                              dark
                                ? "border-white/10 bg-white/5 text-white/80"
                                : "border-slate-200 bg-slate-50 text-slate-600"
                            }`}
                          >
                            <Sparkles size={14} />
                            ATS Resume Builder
                          </div>

                          <h1
                            className={`mt-3 text-3xl font-bold tracking-tight md:text-4xl ${
                              dark ? "text-white" : "text-slate-900"
                            }`}
                          >
                            Build a clean ATS A4 resume
                          </h1>

                          <p
                            className={`mt-2 max-w-2xl text-sm leading-6 md:text-base ${
                              dark ? "text-white/60" : "text-slate-600"
                            }`}
                          >
                            Fill your details, preview the A4 resume live, then download the final ATS PDF.
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <div
                            className={`rounded-2xl border px-4 py-3 ${
                              dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"
                            }`}
                          >
                            <div className={`text-xs font-semibold ${dark ? "text-white/60" : "text-slate-500"}`}>
                              Theme
                            </div>
                            <div className={`mt-1 text-sm font-bold ${dark ? "text-white" : "text-slate-900"}`}>
                              {dark ? "Dark Layout" : "Light Layout"}
                            </div>
                          </div>

                          <div
                            className={`rounded-2xl border px-4 py-3 ${
                              dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"
                            }`}
                          >
                            <div className={`text-xs font-semibold ${dark ? "text-white/60" : "text-slate-500"}`}>
                              ATS Score
                            </div>
                            <div className={`mt-1 text-sm font-bold ${dark ? "text-white" : "text-slate-900"}`}>
                              {atsScore}/100
                            </div>
                          </div>

                          <Button variant="outline" onClick={() => setOpen(false)} className="rounded-2xl">
                            <X size={16} className="mr-2" />
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 grid gap-4 lg:grid-cols-3">
                      <div
                        className={`rounded-3xl border p-4 ${
                          dark ? "border-white/10 text-white" : "border-slate-200 text-slate-900"
                        }`}
                        style={{ backgroundColor: surfaceBg }}
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <Palette size={17} className={dark ? "text-white" : "text-slate-700"} />
                          <p className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-900"}`}>
                            Choose Accent Color
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {accentOptions.map((color) => (
                            <button
                              key={color.value}
                              type="button"
                              title={color.name}
                              onClick={() => setAccentColor(color.value)}
                              className={`h-9 w-9 rounded-full border-2 transition ${
                                accentColor === color.value ? "scale-110" : "scale-100"
                              }`}
                              style={{
                                backgroundColor: color.value,
                                borderColor:
                                  accentColor === color.value
                                    ? dark
                                      ? "#ffffff"
                                      : "#111827"
                                    : "transparent",
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <div
                        className={`rounded-3xl border p-4 ${
                          dark ? "border-white/10 text-white" : "border-slate-200 text-slate-900"
                        }`}
                        style={{ backgroundColor: surfaceBg }}
                      >
                        <p className={`mb-3 text-sm font-semibold ${dark ? "text-white" : "text-slate-900"}`}>
                          Resume Paper Style
                        </p>

                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant={paperMode === "light" ? "default" : "outline"}
                            className="rounded-2xl"
                            style={paperMode === "light" ? { backgroundColor: accentColor, color: "#ffffff" } : {}}
                            onClick={() => setPaperMode("light")}
                          >
                            White Paper
                          </Button>

                          <Button
                            type="button"
                            variant={paperMode === "dark" ? "default" : "outline"}
                            className="rounded-2xl"
                            style={paperMode === "dark" ? { backgroundColor: accentColor, color: "#ffffff" } : {}}
                            onClick={() => setPaperMode("dark")}
                          >
                            Dark Paper
                          </Button>
                        </div>
                      </div>

                      <div
                        className={`rounded-3xl border p-4 ${
                          dark ? "border-white/10 text-white" : "border-slate-200 text-slate-900"
                        }`}
                        style={{ backgroundColor: surfaceBg }}
                      >
                        <p className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-900"}`}>
                          Download
                        </p>
                        <p className={`mt-1 text-xs ${dark ? "text-white/60" : "text-slate-500"}`}>
                          A4 ATS PDF with current selected colors
                        </p>

                        <Button
                          onClick={handleDownloadPDF}
                          disabled={isDownloading}
                          className="mt-3 rounded-2xl text-white"
                          style={{ backgroundColor: accentColor }}
                        >
                          <Download size={16} className="mr-2" />
                          {isDownloading ? "Downloading..." : "Download PDF"}
                        </Button>
                      </div>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                      <div className="space-y-5">
                        <Section icon={User} title="Personal Information" dark={dark}>
                          <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Full Name *" dark={dark}>
                              <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Suraj Kumar Singh"
                                className={`h-11 rounded-2xl ${
                                  dark ? "border-white/10 bg-black text-white placeholder:text-white/40" : ""
                                }`}
                              />
                            </Field>

                            <Field label="Email *" dark={dark}>
                              <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="suraj@example.com"
                                className={`h-11 rounded-2xl ${
                                  dark ? "border-white/10 bg-black text-white placeholder:text-white/40" : ""
                                }`}
                              />
                            </Field>

                            <Field label="Phone *" dark={dark}>
                              <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+91 9876543210"
                                className={`h-11 rounded-2xl ${
                                  dark ? "border-white/10 bg-black text-white placeholder:text-white/40" : ""
                                }`}
                              />
                            </Field>

                            <Field label="Location *" dark={dark}>
                              <Input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Lucknow, India"
                                className={`h-11 rounded-2xl ${
                                  dark ? "border-white/10 bg-black text-white placeholder:text-white/40" : ""
                                }`}
                              />
                            </Field>

                            <Field label="LinkedIn" dark={dark}>
                              <Input
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                placeholder="linkedin.com/in/yourprofile"
                                className={`h-11 rounded-2xl ${
                                  dark ? "border-white/10 bg-black text-white placeholder:text-white/40" : ""
                                }`}
                              />
                            </Field>

                            <Field label="GitHub" dark={dark}>
                              <Input
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                placeholder="github.com/yourprofile"
                                className={`h-11 rounded-2xl ${
                                  dark ? "border-white/10 bg-black text-white placeholder:text-white/40" : ""
                                }`}
                              />
                            </Field>

                            <div className="md:col-span-2">
                              <Field label="Portfolio" dark={dark}>
                                <Input
                                  value={portfolio}
                                  onChange={(e) => setPortfolio(e.target.value)}
                                  placeholder="yourportfolio.dev"
                                  className={`h-11 rounded-2xl ${
                                    dark ? "border-white/10 bg-black text-white placeholder:text-white/40" : ""
                                  }`}
                                />
                              </Field>
                            </div>

                            <div className="md:col-span-2">
                              <div className="mb-1.5 flex items-center justify-between gap-3">
                                <Label
                                  className={`text-xs font-semibold uppercase tracking-wide ${
                                    dark ? "text-white/60" : "text-slate-500"
                                  }`}
                                >
                                  Professional Summary
                                </Label>

                                <button
                                  type="button"
                                  onClick={handleImproveSummary}
                                  className={`text-xs font-semibold ${dark ? "text-white" : "text-slate-700"}`}
                                >
                                  ✨ Improve with AI style
                                </button>
                              </div>

                              <textarea
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                placeholder="Write 2 to 3 lines about your profile, skills, and goals"
                                className={`min-h-[110px] w-full rounded-2xl border px-3 py-2.5 text-sm outline-none ${
                                  dark
                                    ? "border-white/10 bg-black text-white placeholder:text-white/40"
                                    : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                                }`}
                              />
                            </div>
                          </div>
                        </Section>

                        <Section icon={Wrench} title="Skills" dark={dark}>
                          <div className="flex flex-col gap-3 md:flex-row">
                            <Input
                              value={currentSkill}
                              onChange={(e) => setCurrentSkill(e.target.value)}
                              placeholder="Add a skill"
                              className={`h-11 rounded-2xl ${
                                dark ? "border-white/10 bg-black text-white placeholder:text-white/40" : ""
                              }`}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addSkill();
                                }
                              }}
                            />

                            <Button
                              type="button"
                              onClick={() => addSkill()}
                              className="h-11 rounded-2xl px-6 text-white"
                              style={{ backgroundColor: accentColor }}
                            >
                              Add Skill
                            </Button>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {suggestedSkills.map((skill) => (
                              <button
                                key={skill}
                                type="button"
                                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                                  dark
                                    ? "border-white/10 bg-black text-white hover:bg-white/10"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                                }`}
                                onClick={() => addSkill(skill)}
                              >
                                + {skill}
                              </button>
                            ))}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {skills.length === 0 ? (
                              <p className={`text-sm ${dark ? "text-white/60" : "text-slate-500"}`}>
                                No skills added yet.
                              </p>
                            ) : (
                              skills.map((skill) => (
                                <div
                                  key={skill}
                                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                    dark
                                      ? "border-white/10 bg-black text-white"
                                      : "border-slate-200 bg-slate-50 text-slate-700"
                                  }`}
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={() => setSkills((prev) => prev.filter((item) => item !== skill))}
                                  >
                                    <Trash2 size={13} className={dark ? "text-white/60" : "text-slate-500"} />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </Section>

                        <Section
                          icon={GraduationCap}
                          title="Education"
                          dark={dark}
                          right={
                            <Button
                              type="button"
                              variant="outline"
                              className="rounded-2xl"
                              onClick={() => addItem(setEducation, emptyEdu())}
                            >
                              <Plus size={16} className="mr-2" />
                              Add
                            </Button>
                          }
                        >
                          <div className="space-y-4">
                            {education.map((item, index) => (
                              <div
                                key={index}
                                className={`rounded-2xl border p-4 ${
                                  dark ? "border-white/10 bg-black" : "border-slate-200 bg-slate-50"
                                }`}
                              >
                                <div className="mb-3 flex items-center justify-between">
                                  <p className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-800"}`}>
                                    Education {index + 1}
                                  </p>

                                  {education.length > 1 && (
                                    <button type="button" onClick={() => removeItem(setEducation, index)}>
                                      <Trash2 size={16} className="text-red-500" />
                                    </button>
                                  )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                  <Field label="Degree" dark={dark}>
                                    <Input
                                      value={item.degree}
                                      onChange={(e) => updateItem(setEducation, index, "degree", e.target.value)}
                                      placeholder="B.Tech"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <Field label="College" dark={dark}>
                                    <Input
                                      value={item.college}
                                      onChange={(e) => updateItem(setEducation, index, "college", e.target.value)}
                                      placeholder="AKTU"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <Field label="Branch" dark={dark}>
                                    <Input
                                      value={item.branch}
                                      onChange={(e) => updateItem(setEducation, index, "branch", e.target.value)}
                                      placeholder="Computer Science"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <Field label="Start Year" dark={dark}>
                                    <Input
                                      value={item.startYear}
                                      onChange={(e) => updateItem(setEducation, index, "startYear", e.target.value)}
                                      placeholder="2023"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <Field label="End Year" dark={dark}>
                                    <Input
                                      value={item.endYear}
                                      onChange={(e) => updateItem(setEducation, index, "endYear", e.target.value)}
                                      placeholder="2027"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <Field label="CGPA / %" dark={dark}>
                                    <Input
                                      value={item.cgpa}
                                      onChange={(e) => updateItem(setEducation, index, "cgpa", e.target.value)}
                                      placeholder="8.2"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Section>

                        <Section
                          icon={Briefcase}
                          title="Experience"
                          dark={dark}
                          right={
                            <Button
                              type="button"
                              variant="outline"
                              className="rounded-2xl"
                              onClick={() => addItem(setExperience, emptyExp())}
                            >
                              <Plus size={16} className="mr-2" />
                              Add
                            </Button>
                          }
                        >
                          <div className="space-y-4">
                            {experience.map((item, index) => (
                              <div
                                key={index}
                                className={`rounded-2xl border p-4 ${
                                  dark ? "border-white/10 bg-black" : "border-slate-200 bg-slate-50"
                                }`}
                              >
                                <div className="mb-3 flex items-center justify-between">
                                  <p className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-800"}`}>
                                    Experience {index + 1}
                                  </p>

                                  {experience.length > 1 && (
                                    <button type="button" onClick={() => removeItem(setExperience, index)}>
                                      <Trash2 size={16} className="text-red-500" />
                                    </button>
                                  )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                  <Field label="Role" dark={dark}>
                                    <Input
                                      value={item.role}
                                      onChange={(e) => updateItem(setExperience, index, "role", e.target.value)}
                                      placeholder="Software Developer Intern"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <Field label="Company" dark={dark}>
                                    <Input
                                      value={item.company}
                                      onChange={(e) => updateItem(setExperience, index, "company", e.target.value)}
                                      placeholder="ABC Tech"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <div className="md:col-span-2">
                                    <Field label="Duration" dark={dark}>
                                      <Input
                                        value={item.duration}
                                        onChange={(e) => updateItem(setExperience, index, "duration", e.target.value)}
                                        placeholder="Jan 2025 - Mar 2025"
                                        className={`h-11 rounded-2xl ${
                                          dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                        }`}
                                      />
                                    </Field>
                                  </div>

                                  <div className="md:col-span-2">
                                    <Field label="Description" dark={dark}>
                                      <textarea
                                        value={item.description}
                                        onChange={(e) => updateItem(setExperience, index, "description", e.target.value)}
                                        placeholder="Example: developed REST APIs and improved response time by 30%"
                                        className={`min-h-[100px] w-full rounded-2xl border px-3 py-2.5 text-sm outline-none ${
                                          dark
                                            ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40"
                                            : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                                        }`}
                                      />
                                    </Field>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Section>

                        <Section
                          icon={FileText}
                          title="Projects"
                          dark={dark}
                          right={
                            <Button
                              type="button"
                              variant="outline"
                              className="rounded-2xl"
                              onClick={() => addItem(setProjects, emptyProj())}
                            >
                              <Plus size={16} className="mr-2" />
                              Add
                            </Button>
                          }
                        >
                          <div className="space-y-4">
                            {projects.map((item, index) => (
                              <div
                                key={index}
                                className={`rounded-2xl border p-4 ${
                                  dark ? "border-white/10 bg-black" : "border-slate-200 bg-slate-50"
                                }`}
                              >
                                <div className="mb-3 flex items-center justify-between">
                                  <p className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-800"}`}>
                                    Project {index + 1}
                                  </p>

                                  {projects.length > 1 && (
                                    <button type="button" onClick={() => removeItem(setProjects, index)}>
                                      <Trash2 size={16} className="text-red-500" />
                                    </button>
                                  )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                  <Field label="Project Title" dark={dark}>
                                    <Input
                                      value={item.title}
                                      onChange={(e) => updateItem(setProjects, index, "title", e.target.value)}
                                      placeholder="Job Portal"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <Field label="Tech Stack" dark={dark}>
                                    <Input
                                      value={item.techStack}
                                      onChange={(e) => updateItem(setProjects, index, "techStack", e.target.value)}
                                      placeholder="React, Node.js, TypeScript"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <Field label="GitHub Link" dark={dark}>
                                    <Input
                                      value={item.github}
                                      onChange={(e) => updateItem(setProjects, index, "github", e.target.value)}
                                      placeholder="github.com/username/project"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <Field label="Live Link" dark={dark}>
                                    <Input
                                      value={item.liveLink}
                                      onChange={(e) => updateItem(setProjects, index, "liveLink", e.target.value)}
                                      placeholder="project.vercel.app"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <div className="md:col-span-2">
                                    <Field label="Description" dark={dark}>
                                      <textarea
                                        value={item.description}
                                        onChange={(e) => updateItem(setProjects, index, "description", e.target.value)}
                                        placeholder="Example: built a full-stack job portal with authentication, resume upload, and recruiter dashboard"
                                        className={`min-h-[100px] w-full rounded-2xl border px-3 py-2.5 text-sm outline-none ${
                                          dark
                                            ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40"
                                            : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                                        }`}
                                      />
                                    </Field>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Section>

                        <Section
                          icon={Award}
                          title="Certifications"
                          dark={dark}
                          right={
                            <Button
                              type="button"
                              variant="outline"
                              className="rounded-2xl"
                              onClick={() => addItem(setCertifications, emptyCert())}
                            >
                              <Plus size={16} className="mr-2" />
                              Add
                            </Button>
                          }
                        >
                          <div className="space-y-4">
                            {certifications.map((item, index) => (
                              <div
                                key={index}
                                className={`rounded-2xl border p-4 ${
                                  dark ? "border-white/10 bg-black" : "border-slate-200 bg-slate-50"
                                }`}
                              >
                                <div className="mb-3 flex items-center justify-between">
                                  <p className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-800"}`}>
                                    Certification {index + 1}
                                  </p>

                                  {certifications.length > 1 && (
                                    <button type="button" onClick={() => removeItem(setCertifications, index)}>
                                      <Trash2 size={16} className="text-red-500" />
                                    </button>
                                  )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                  <Field label="Title" dark={dark}>
                                    <Input
                                      value={item.title}
                                      onChange={(e) =>
                                        updateItem(setCertifications, index, "title", e.target.value)
                                      }
                                      placeholder="AWS Cloud Practitioner"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <Field label="Platform" dark={dark}>
                                    <Input
                                      value={item.platform}
                                      onChange={(e) =>
                                        updateItem(setCertifications, index, "platform", e.target.value)
                                      }
                                      placeholder="Coursera"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>

                                  <Field label="Year" dark={dark}>
                                    <Input
                                      value={item.year}
                                      onChange={(e) => updateItem(setCertifications, index, "year", e.target.value)}
                                      placeholder="2026"
                                      className={`h-11 rounded-2xl ${
                                        dark ? "border-white/10 bg-[#111111] text-white placeholder:text-white/40" : ""
                                      }`}
                                    />
                                  </Field>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Section>

                        <Section icon={Trophy} title="Achievements" dark={dark}>
                          <div className="flex flex-col gap-3 md:flex-row">
                            <Input
                              value={currentAchievement}
                              onChange={(e) => setCurrentAchievement(e.target.value)}
                              placeholder="Add achievement"
                              className={`h-11 rounded-2xl ${
                                dark ? "border-white/10 bg-black text-white placeholder:text-white/40" : ""
                              }`}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addAchievement();
                                }
                              }}
                            />

                            <Button
                              type="button"
                              onClick={addAchievement}
                              className="h-11 rounded-2xl px-6 text-white"
                              style={{ backgroundColor: accentColor }}
                            >
                              Add Achievement
                            </Button>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {achievements.map((item) => (
                              <div
                                key={item}
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                  dark
                                    ? "border-white/10 bg-black text-white"
                                    : "border-slate-200 bg-slate-50 text-slate-700"
                                }`}
                              >
                                {item}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setAchievements((prev) => prev.filter((value) => value !== item))
                                  }
                                >
                                  <Trash2 size={13} className={dark ? "text-white/60" : "text-slate-500"} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </Section>

                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Button
                            onClick={handleDownloadPDF}
                            disabled={isDownloading}
                            className="h-12 rounded-2xl px-6 text-sm font-semibold text-white"
                            style={{ backgroundColor: accentColor }}
                          >
                            <Download size={17} className="mr-2" />
                            {isDownloading ? "Downloading..." : "Download ATS PDF"}
                          </Button>

                          <Button
                            variant="outline"
                            onClick={resetAll}
                            className="h-12 rounded-2xl px-6 text-sm font-semibold"
                          >
                            Reset Form
                          </Button>
                        </div>
                      </div>

                      <div className="xl:sticky xl:top-6 xl:h-fit">
                        <div
                          className={`mb-4 flex items-center justify-between rounded-3xl border p-4 ${
                            dark ? "border-white/10" : "border-slate-200"
                          }`}
                          style={{ backgroundColor: surfaceBg }}
                        >
                          <div>
                            <p className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-900"}`}>
                              Live ATS Preview
                            </p>
                            <p className={`text-xs ${dark ? "text-white/60" : "text-slate-500"}`}>
                              Theme responsive + real A4 resume layout
                            </p>
                          </div>

                          <div
                            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                            style={{ backgroundColor: accentColor }}
                          >
                            {paperIsDark ? "Dark Paper" : "White Paper"}
                          </div>
                        </div>

                        <div
                          className={`overflow-auto rounded-3xl border p-3 ${
                            dark ? "border-white/10" : "border-slate-200"
                          }`}
                          style={{ backgroundColor: previewOuterBg }}
                        >
                          <div
                            ref={resumeRef}
                            id="resume-preview"
                            className="mx-auto"
                            style={{
                              width: "210mm",
                              minHeight: "297mm",
                              padding: "14mm",
                              fontFamily: "Arial, Helvetica, sans-serif",
                              backgroundColor: paperBg,
                              color: paperText,
                            }}
                          >
                            <div
                              className="avoid-break"
                              style={{
                                borderBottom: `2px solid ${accentColor}`,
                                paddingBottom: "10px",
                                marginBottom: "12px",
                              }}
                            >
                              <h1
                                style={{
                                  fontSize: "22px",
                                  fontWeight: 700,
                                  marginBottom: "6px",
                                  lineHeight: 1.2,
                                  color: paperText,
                                }}
                              >
                                {previewData.fullName}
                              </h1>

                              <div
                                style={{
                                  fontSize: "10.5px",
                                  color: paperSub,
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "10px",
                                  lineHeight: 1.5,
                                }}
                              >
                                {previewData.email && <span>{previewData.email}</span>}
                                {previewData.phone && <span>{previewData.phone}</span>}
                                {previewData.location && <span>{previewData.location}</span>}
                                {previewData.linkedin && <span>{previewData.linkedin}</span>}
                                {previewData.github && <span>{previewData.github}</span>}
                                {previewData.portfolio && <span>{previewData.portfolio}</span>}
                              </div>
                            </div>

                            <ResumeBlock title="Professional Summary" paperMode={paperMode}>
                              <p style={{ fontSize: "11px", lineHeight: 1.6, color: paperText }}>
                                {previewData.summary}
                              </p>
                            </ResumeBlock>

                            {previewData.skills.length > 0 && (
                              <ResumeBlock title="Skills" paperMode={paperMode}>
                                <p style={{ fontSize: "11px", lineHeight: 1.6, color: paperText }}>
                                  {previewData.skills.join(", ")}
                                </p>
                              </ResumeBlock>
                            )}

                            {previewData.education.length > 0 && (
                              <ResumeBlock title="Education" paperMode={paperMode}>
                                <div style={{ display: "grid", gap: "10px" }}>
                                  {previewData.education.map((item, index) => (
                                    <div key={index} className="avoid-break">
                                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                        <div>
                                          <p style={{ fontSize: "11px", fontWeight: 700, color: paperText }}>
                                            {item.degree}
                                            {item.branch ? ` - ${item.branch}` : ""}
                                          </p>
                                          <p style={{ fontSize: "10.5px", color: paperSub }}>{item.college}</p>
                                        </div>

                                        <div style={{ textAlign: "right", fontSize: "10.5px", color: paperSub }}>
                                          <p>
                                            {item.startYear}
                                            {item.startYear && item.endYear ? " - " : ""}
                                            {item.endYear}
                                          </p>
                                          {item.cgpa && <p>{item.cgpa}</p>}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </ResumeBlock>
                            )}

                            {previewData.experience.length > 0 && (
                              <ResumeBlock title="Experience" paperMode={paperMode}>
                                <div style={{ display: "grid", gap: "10px" }}>
                                  {previewData.experience.map((item, index) => (
                                    <div key={index} className="avoid-break">
                                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                        <div>
                                          <p style={{ fontSize: "11px", fontWeight: 700, color: paperText }}>
                                            {item.role}
                                          </p>
                                          <p style={{ fontSize: "10.5px", color: paperSub }}>{item.company}</p>
                                        </div>

                                        <p
                                          style={{
                                            fontSize: "10.5px",
                                            textAlign: "right",
                                            color: paperSub,
                                          }}
                                        >
                                          {item.duration}
                                        </p>
                                      </div>

                                      {item.description && (
                                        <ul style={{ marginTop: "4px", paddingLeft: "16px" }}>
                                          <li
                                            style={{
                                              fontSize: "10.8px",
                                              lineHeight: 1.55,
                                              color: paperText,
                                            }}
                                          >
                                            {item.description}
                                          </li>
                                        </ul>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </ResumeBlock>
                            )}

                            {previewData.projects.length > 0 && (
                              <ResumeBlock title="Projects" paperMode={paperMode}>
                                <div style={{ display: "grid", gap: "10px" }}>
                                  {previewData.projects.map((item, index) => (
                                    <div key={index} className="avoid-break">
                                      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                        <div>
                                          <p style={{ fontSize: "11px", fontWeight: 700, color: paperText }}>
                                            {item.title}
                                          </p>
                                          {item.techStack && (
                                            <p style={{ fontSize: "10.5px", color: paperSub }}>
                                              Tech: {item.techStack}
                                            </p>
                                          )}
                                        </div>

                                        <div style={{ textAlign: "right", fontSize: "10px", color: paperSub }}>
                                          {item.github && <p>{item.github}</p>}
                                          {item.liveLink && <p>{item.liveLink}</p>}
                                        </div>
                                      </div>

                                      {item.description && (
                                        <ul style={{ marginTop: "4px", paddingLeft: "16px" }}>
                                          <li
                                            style={{
                                              fontSize: "10.8px",
                                              lineHeight: 1.55,
                                              color: paperText,
                                            }}
                                          >
                                            {item.description}
                                          </li>
                                        </ul>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </ResumeBlock>
                            )}

                            {previewData.certifications.length > 0 && (
                              <ResumeBlock title="Certifications" paperMode={paperMode}>
                                <div style={{ display: "grid", gap: "8px" }}>
                                  {previewData.certifications.map((item, index) => (
                                    <div
                                      key={index}
                                      className="avoid-break"
                                      style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}
                                    >
                                      <div>
                                        <p style={{ fontSize: "11px", fontWeight: 700, color: paperText }}>
                                          {item.title}
                                        </p>
                                        <p style={{ fontSize: "10.5px", color: paperSub }}>{item.platform}</p>
                                      </div>
                                      <p style={{ fontSize: "10.5px", color: paperSub }}>{item.year}</p>
                                    </div>
                                  ))}
                                </div>
                              </ResumeBlock>
                            )}

                            {previewData.achievements.length > 0 && (
                              <ResumeBlock title="Achievements" paperMode={paperMode}>
                                <ul style={{ paddingLeft: "16px", display: "grid", gap: "4px" }}>
                                  {previewData.achievements.map((item, index) => (
                                    <li
                                      key={index}
                                      className="avoid-break"
                                      style={{
                                        fontSize: "10.8px",
                                        lineHeight: 1.55,
                                        color: paperText,
                                      }}
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </ResumeBlock>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeBuilderATS;