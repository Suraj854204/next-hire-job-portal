"use client";
import CarrerGuide from "@/components/carrer-guide";
import LandTcs from "@/components/land-tcs";
import JobsAcross from "@/components/jobs-across";
import Hero from "@/components/hero";
import ResumeAnalyzer from "@/components/resume-analyser";
import ResumeBuilderATS from "@/components/ResumeBuilderATS";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <CarrerGuide />
      <ResumeAnalyzer />
      <ResumeBuilderATS />
      <JobsAcross />
      <LandTcs />
    </div>
  );
};

export default Home;
