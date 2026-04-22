"use client";

import { CareerGuideResponse } from "@/type";
import axios from "axios";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Lightbulb,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
  X,
  CheckCircle2,
  Compass,
  Star,
} from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { utils_service } from "@/context/AppContext";
import toast from "react-hot-toast";

const suggestedSkills = [
  "React",
  "Node.js",
  "Java",
  "Spring Boot",
  "JavaScript",
  "TypeScript",
  "Python",
  "SQL",
  "MongoDB",
  "DSA",
  "Git",
  "Docker",
];

const CareerGuide = () => {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CareerGuideResponse | null>(null);

  const addSkill = () => {
    const trimmedSkill = currentSkill.trim();

    if (!trimmedSkill) return;

    const alreadyExists = skills.some(
      (skill) => skill.toLowerCase() === trimmedSkill.toLowerCase()
    );

    if (alreadyExists) {
      toast.error("Skill already added");
      return;
    }

    setSkills((prev) => [...prev, trimmedSkill]);
    setCurrentSkill("");
  };

  const addSuggestedSkill = (skillToAdd: string) => {
    const alreadyExists = skills.some(
      (skill) => skill.toLowerCase() === skillToAdd.toLowerCase()
    );

    if (alreadyExists) return;

    setSkills((prev) => [...prev, skillToAdd]);
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const getCareerGuidance = async () => {
    if (skills.length === 0) {
      toast.error("Please add at least one skill");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`${utils_service}/api/utils/career`, {
        skills,
      });

      setResponse(data);
      toast.success("Career guidance generated successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetDialog = () => {
    setSkills([]);
    setCurrentSkill("");
    setResponse(null);
    setOpen(false);
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
               AI-Powered Career Guidance
             </p>
           <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
             Discover the Best
             <span className="block bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text     text-transparent">
              Career Path for You
             </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              Add your current skills and get personalized role suggestions, learning recommendations,
              and a practical roadmap to grow faster.
           </p>
         </div>
          <div className="mt-8">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="h-12 rounded-xl px-8 gap-2">
                  <Sparkles size={18} />
                  Get Career Guidance
                  <ArrowRight size={18} />
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl">
                {!response ? (
                  <>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Sparkles className="text-primary" />
                        Tell us about your skills
                      </DialogTitle>
                      <DialogDescription>
                        Add your technical skills to receive personalized career
                        recommendations and a learning roadmap.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      <div className="rounded-2xl border border-border bg-card p-5">
                        <div className="space-y-3">
                          <Label htmlFor="skill" className="text-sm font-medium">
                            Add Skills
                          </Label>

                          <div className="flex flex-col gap-3 sm:flex-row">
                            <Input
                              id="skill"
                              placeholder="e.g. React, Node.js, Java, Spring Boot..."
                              value={currentSkill}
                              onChange={(e) => setCurrentSkill(e.target.value)}
                              onKeyDown={handleKeyPress}
                              className="h-12"
                            />
                            <Button
                              type="button"
                              onClick={addSkill}
                              className="h-12 px-6"
                            >
                              Add Skill
                            </Button>
                          </div>

                          <p className="text-xs text-muted-foreground">
                            Press Enter or click Add Skill
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border bg-card p-5">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <Label className="text-sm font-medium">
                            Suggested Skills
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            Click to add quickly
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {suggestedSkills.map((skill) => {
                            const isAdded = skills.some(
                              (item) => item.toLowerCase() === skill.toLowerCase()
                            );

                            return (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => addSuggestedSkill(skill)}
                                disabled={isAdded}
                                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                                  isAdded
                                    ? "border-border bg-muted text-muted-foreground cursor-not-allowed"
                                    : "border-border bg-background hover:border-primary hover:text-primary"
                                }`}
                              >
                                {skill}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border bg-card p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <Label className="text-sm font-medium">
                            Your Skills
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            {skills.length} skill{skills.length !== 1 ? "s" : ""} added
                          </span>
                        </div>

                        {skills.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                              <div
                                key={skill}
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-primary/10 pl-3 pr-2 py-1.5"
                              >
                                <span className="text-sm font-medium text-foreground">
                                  {skill}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No skills added yet.
                          </p>
                        )}
                      </div>

                      <Button
                        onClick={getCareerGuidance}
                        disabled={loading || skills.length === 0}
                        className="w-full h-12 rounded-xl gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Generating your career guide...
                          </>
                        ) : (
                          <>
                            <Sparkles size={18} />
                            Generate Career Guidance
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Target className="text-primary" />
                        Your Personalized Career Guide
                      </DialogTitle>
                      <DialogDescription>
                        Here is a tailored path based on your current skills and
                        potential growth areas.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      {/* Summary */}
                      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/30">
                        <div className="flex items-start gap-3">
                          <Lightbulb
                            className="mt-1 shrink-0 text-blue-600"
                            size={20}
                          />
                          <div>
                            <h3 className="mb-2 text-lg font-semibold text-foreground">
                              Career Summary
                            </h3>
                            <p className="text-sm leading-7 text-foreground/90">
                              {response.summary}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Recommended roles */}
                      <div>
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                          <Briefcase size={20} className="text-primary" />
                          Recommended Career Paths
                        </h3>

                        <div className="grid gap-4">
                          {response.jobOptions.map((job, index) => (
                            <div
                              key={index}
                              className="rounded-2xl border border-border bg-card p-5 transition-all hover:shadow-md"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h4 className="text-base font-semibold text-foreground">
                                    {job.title}
                                  </h4>
                                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                    <span className="font-medium text-foreground">
                                      Responsibilities:{" "}
                                    </span>
                                    {job.responsibilities}
                                  </p>
                                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    <span className="font-medium text-foreground">
                                      Why this role:{" "}
                                    </span>
                                    {job.why}
                                  </p>
                                </div>

                                <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                  <Briefcase className="h-5 w-5 text-primary" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills to learn */}
                      <div>
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                          <TrendingUp size={20} className="text-primary" />
                          Skills to Enhance Your Career
                        </h3>

                        <div className="space-y-5">
                          {response.skillsToLearn.map((category, index) => (
                            <div
                              key={index}
                              className="rounded-2xl border border-border bg-card p-5"
                            >
                              <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                                <Star size={16} />
                                {category.category}
                              </h4>

                              <div className="space-y-3">
                                {category.skills.map((skill, skillIndex) => (
                                  <div
                                    key={skillIndex}
                                    className="rounded-xl border border-border bg-muted/30 p-4"
                                  >
                                    <p className="font-semibold text-foreground">
                                      {skill.title}
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                      <span className="font-medium text-foreground">
                                        Why:{" "}
                                      </span>
                                      {skill.why}
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                      <span className="font-medium text-foreground">
                                        How:{" "}
                                      </span>
                                      {skill.how}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Learning approach */}
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/20">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                          <BookOpen size={20} className="text-emerald-600" />
                          {response.learningApproach?.title}
                        </h3>

                        <ul className="space-y-3">
                          {response.learningApproach?.points?.map(
                            (point, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3 text-sm"
                              >
                                <span className="mt-1 text-emerald-600">
                                  <CheckCircle2 size={16} />
                                </span>
                                <span
                                  className="leading-6 text-foreground/90"
                                  dangerouslySetInnerHTML={{ __html: point }}
                                />
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Bottom action card */}
                      <div className="rounded-2xl border border-border bg-card p-5">
                        <div className="flex items-start gap-3">
                          <Compass className="mt-1 text-primary" size={20} />
                          <div>
                            <h3 className="font-semibold text-foreground">
                              Next Best Move
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                              Focus on one target role, strengthen the missing
                              skills one by one, build 1 to 2 strong projects,
                              and then start applying strategically.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={resetDialog}
                        variant="outline"
                        className="w-full rounded-xl"
                      >
                        Start New Analysis
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

export default CareerGuide;