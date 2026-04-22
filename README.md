<div align="center">

<img width="110" src="https://img.icons8.com/fluency/100/briefcase.png" alt="NextHire Logo"/>

# 🚀 NextHire — AI-Powered Job Portal

### A scalable full-stack job platform built with **Microservices Architecture**
### featuring **AI Resume Builder, Resume Analyzer, ATS Score Checker, Career Guidance, Kafka-based async communication, and Recruiter Hiring Workflows**

## 📌 What is NextHire?

**NextHire** is an **AI-powered job portal** designed for both **Job Seekers** and **Recruiters**.

It is not just a basic job board. It is a complete hiring ecosystem that combines:

- 💼 job posting and application workflows
- 🤖 AI-powered resume analysis and ATS scoring
- 🧾 ATS-friendly resume builder
- 🛣️ personalized career guidance
- 📬 asynchronous email notifications using Kafka
- 💳 subscription/payment support
- 🧩 scalable microservices architecture

The platform is built to simulate how **real-world production systems** are designed in modern companies, where services are independent, loosely coupled, and communicate asynchronously.

---

## 🎯 Why this project?

Most job portal projects stop at:
- user login
- job posting
- apply button

**NextHire goes beyond that.**

This project solves real hiring and career problems:

### For Job Seekers
- Build a clean ATS-friendly resume
- Check resume score before applying
- Compare resume against job descriptions
- Get AI-based suggestions to improve selection chances
- Get career guidance based on skills and target role

### For Recruiters
- Post jobs and manage openings
- Review applicants in one place
- Screen resumes faster using AI score
- Shortlist candidates more efficiently
- Manage hiring flow with better visibility

---

## 👥 Who is this website for?

### 🧑‍💻 Job Seekers
Job seekers can:
- create an account
- build or upload resumes
- analyze resume quality
- check ATS score
- browse and apply to jobs
- view application progress
- improve profile and skills
- get career recommendations

### 🧑‍💼 Recruiters
Recruiters can:
- create recruiter accounts
- post job openings
- manage company/job details
- view applicants
- evaluate resumes with AI-based screening support
- track hiring pipeline
- manage subscription/payment plans

---

## ✨ Core Highlights

- ✅ Microservices-based architecture
- ✅ AI Resume Builder
- ✅ Resume Analyzer with ATS score
- ✅ Career Guidance engine
- ✅ Job Seeker and Recruiter flows
- ✅ Kafka-based async communication
- ✅ JWT auth and secure password reset
- ✅ PostgreSQL + Redis + Cloudinary integration
- ✅ Payment/subscription support
- ✅ Production-oriented backend design

---

## 🏗️ System Architecture

```text
┌──────────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js + Tailwind)               │
│  Job Seeker UI · Recruiter UI · Resume Builder · Resume Check   │
└───────────────────────────────┬──────────────────────────────────┘
                                │
                                │ HTTP / REST APIs
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│                         Auth Layer / Middleware                  │
│                 JWT Validation · Route Protection               │
└───────────────┬──────────────────┬─────────────────┬─────────────┘
                │                  │                 │
                ▼                  ▼                 ▼
         ┌────────────┐     ┌────────────┐    ┌────────────┐
         │ Auth Svc   │     │ User Svc   │    │ Job Svc    │
         │ Login      │     │ Profile    │    │ Jobs       │
         │ Register   │     │ Skills     │    │ Apply      │
         │ Forgot     │     │ Resume     │    │ Recruiter  │
         │ Reset      │     │ Account    │    │ Listings   │
         └─────┬──────┘     └─────┬──────┘    └─────┬──────┘
               │                  │                 │
               └──────────────┬───┴─────────────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │  Payment Service │
                     │  Plans / Billing │
                     └────────┬─────────┘
                              │
                              ▼
                 ┌─────────────────────────────┐
                 │ Kafka Event Streaming Layer │
                 │   Producers  →  Consumers   │
                 └──────────────┬──────────────┘
                                │
                                ▼
                     ┌────────────────────────┐
                     │      Utils Service     │
                     │  Mail · Notifications  │
                     │  AI Tasks / Consumers  │
                     └───────┬────────┬───────┘
                             │        │
                ┌────────────┘        └────────────┐
                ▼                                  ▼
       ┌──────────────────┐              ┌──────────────────┐
       │ PostgreSQL       │              │ Redis            │
       │ NeonDB           │              │ Cache / Tokens   │
       └──────────────────┘              └──────────────────┘

                             ▼
                    ┌──────────────────┐
                    │ Cloudinary       │
                    │ Resume / Images  │
                    └──────────────────┘
