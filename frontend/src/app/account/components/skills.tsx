"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppData } from "@/context/AppContext";
import { AccountProps } from "@/type";
import { Award, Plus, Sparkles, X } from "lucide-react";
import React, { useState } from "react";

const Skills: React.FC<AccountProps> = ({ user, isYourAccount }) => {
  const { addSkill, btnLoading, removeSkill } = useAppData();
  const [skill, setSkill] = useState("");

  const addSkillHandler = () => {
    if (!skill.trim()) {
      alert("Please enter a skill");
      return;
    }
    addSkill(skill, setSkill);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addSkillHandler();
  };

  const removeSkillHandler = (skillToRemove: string) => {
    if (confirm(`Remove "${skillToRemove}" from your skills?`)) {
      removeSkill(skillToRemove);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-8">
      <Card className="overflow-hidden border shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b px-6 py-5 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Award className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                {isYourAccount ? "Your Skills" : "Skills"}
              </h2>
              {user.skills && user.skills.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {user.skills.length} skill{user.skills.length > 1 ? "s" : ""} listed
                </p>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-5">
          {/* Add skill input */}
          {isYourAccount && (
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="relative flex-1">
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g. React, Node.js, Python..."
                  className="h-11 pl-9 rounded-xl"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button
                onClick={addSkillHandler}
                disabled={!skill.trim() || btnLoading}
                className="h-11 gap-2 px-5 rounded-xl shrink-0"
              >
                {btnLoading ? (
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Add Skill
              </Button>
            </div>
          )}

          {/* Skills list */}
          {user.skills && user.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
                >
                  {s}
                  {isYourAccount && (
                    <button
                      onClick={() => removeSkillHandler(s)}
                      className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                      aria-label={`Remove ${s}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Award className="h-5 w-5 text-muted-foreground opacity-50" />
              </div>
              <p className="text-sm font-medium text-foreground">
                {isYourAccount ? "No skills added yet" : "No skills listed"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {isYourAccount
                  ? "Add skills above to showcase your expertise to employers"
                  : "This user hasn't added any skills yet"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Skills;