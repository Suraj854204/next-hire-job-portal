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


Register/Login
   ↓
Complete Profile
   ↓
Create or Upload Resume
   ↓
Resume Analyzer / ATS Score
   ↓
Browse Jobs
   ↓
Apply for Jobs
   ↓
Track Applications
   ↓
Get Notifications / Career Guidance



Register/Login as Recruiter
   ↓
Create Company / Recruiter Profile
   ↓
Post Job Openings
   ↓
Receive Applications
   ↓
Review Resume + AI Score
   ↓
Shortlist / Manage Hiring Pipeline
   ↓
Send Updates / Notifications


🤖 AI Features
1. AI Resume Builder

An ATS-friendly resume creation tool that helps users generate structured resumes with proper sections, readability, and recruiter-friendly formatting.

Why it matters:

many users do not know correct resume structure
ATS systems reject badly formatted resumes
a clean structure improves shortlist chances
2. Resume Analyzer

Analyzes uploaded resume content against hiring expectations and gives improvement suggestions.

What it checks:

missing skills
weak resume sections
content quality
role alignment
keyword gaps
3. Resume Check Score / ATS Score

Provides a score to help job seekers understand how well their resume matches the target job.

Why it matters:

helps candidates improve before applying
saves recruiter time
increases application quality
4. Career Guidance Feature

Generates a career roadmap based on current skills and target role.

Example use cases:

“I know Java and DSA, what should I learn next?”
“How can I become backend developer?”
“What skills are missing for product-based companies?”
📦 Feature Breakdown
🧑 Job Seeker Features
User registration and login
Secure forgot/reset password flow
Resume upload
Resume builder
Resume score checker
ATS analysis
Job browsing and application
Profile update and skills management
Career roadmap / guidance
Application status tracking
🧑‍💼 Recruiter Features
Recruiter registration and login
Company/job posting workflows
Candidate listing
Resume screening support
Applicant review interface
Hiring workflow support
Subscription/payment integration
⚙️ Platform Features
JWT authentication
Role-based flows
Kafka-based async events
Email notifications
Media upload support
Scalable service separation
Redis-based token/cache support
🛠️ Tech Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Shadcn UI / reusable component approach
Backend
Node.js
Express.js
TypeScript
Microservices Architecture
Communication & Infra
Apache Kafka — async producer/consumer communication
Redis — caching and token storage
Docker — containerized local development
Docker Compose — service orchestration
Database & Storage
PostgreSQL (NeonDB)
Cloudinary for file/media storage
Integrations
Nodemailer for emails
Razorpay for subscription/payment flow
AI API / Model integration for resume analysis and career guidance
🔒 Security Features
JWT-based authentication
Secure password hashing
Forgot-password reset token flow
Token expiration and invalidation
Input validation at service level
Protected routes for authenticated users
Recruiter/job seeker role separation
📘 What this project teaches

This project demonstrates practical understanding of:

microservices design
REST API development
Kafka producers and consumers
JWT authentication
password reset workflow
file upload handling
cloud media integration
payment integration
ATS resume scoring logic
scalable full-stack system design


next-hire-job-portal/
│
├── frontend/                     # Next.js frontend
│   ├── src/
│   │   ├── app/                  # Pages / routes
│   │   ├── components/           # UI components
│   │   ├── context/              # App context
│   │   └── lib/                  # Utility functions
│   └── public/                   # Static assets
│
├── services/
│   ├── auth/                     # Authentication service
│   ├── user/                     # User/profile service
│   ├── job/                      # Job listing & apply service
│   ├── payment/                  # Payment/subscription service
│   └── utils/                    # Kafka consumer, mail, helpers
│
├── .gitignore
├── LICENSE
└── README.md
