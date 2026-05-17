<div align="center">

<img width="100" src="https://img.icons8.com/fluency/100/briefcase.png" alt="NextHire Logo"/>

# 🚀 NextHire — AI-Powered Job Portal

### A scalable full-stack job platform built with **Microservices Architecture**
### featuring **AI Resume Builder · Resume Analyzer · ATS Score Checker · Career Guidance · Kafka · Recruiter Workflows**

<br/>

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## 📌 What is NextHire?

**NextHire** is a production-grade, AI-powered job portal designed for both **Job Seekers** and **Recruiters**. It goes far beyond a typical job board — it is a complete hiring ecosystem built to simulate how real-world production systems are designed in modern companies.

> **Most job portal projects stop at:** user login → job posting → apply button.
> **NextHire goes beyond that.**

### What makes NextHire different?

| Basic Job Portal | NextHire |
|---|---|
| Login / Register | ✅ JWT Auth + Password Reset |
| Post a Job | ✅ Full Recruiter Hiring Workflow |
| Apply Button | ✅ Application Tracking + AI Screening |
| — | ✅ AI Resume Builder |
| — | ✅ ATS Score Checker |
| — | ✅ Resume Analyzer with Suggestions |
| — | ✅ Career Guidance Engine |
| — | ✅ Kafka-based Async Notifications |
| — | ✅ Subscription & Payment Support |
| — | ✅ Microservices Architecture |

---

## 🎯 Core Highlights

- ✅ **Microservices-based architecture** — independent, loosely coupled services
- ✅ **AI Resume Builder** — generate ATS-friendly resumes with AI assistance
- ✅ **Resume Analyzer** — deep analysis with actionable improvement suggestions
- ✅ **ATS Score Checker** — score your resume against any job description
- ✅ **Career Guidance Engine** — personalized recommendations based on skills and target role
- ✅ **Kafka-based async communication** — event-driven email and AI task queues
- ✅ **JWT Auth** — secure login, registration, forgot password, and reset flows
- ✅ **PostgreSQL + Redis + Cloudinary** — robust, production-ready data layer
- ✅ **Payment & Subscription Support** — plan management for recruiter features
- ✅ **Production-oriented backend design** — built the way real companies build

---

## 👥 Who Is This For?

### 🧑‍💻 Job Seekers
Job seekers can:
- Create an account and build a complete profile
- Build or upload ATS-friendly resumes using the AI Resume Builder
- Analyze resume quality and get AI-powered suggestions
- Check ATS score before applying to any job
- Browse job listings and apply with a single click
- Track application status and progress
- Improve profile based on skill gap insights
- Get personalized career recommendations based on target role

### 🧑‍💼 Recruiters
Recruiters can:
- Create a recruiter account and set up company details
- Post and manage job openings
- Review all applicants in a unified dashboard
- Evaluate resumes using AI-based screening support
- Shortlist candidates faster with ATS score insights
- Track and manage the full hiring pipeline
- Manage subscription and payment plans

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                   Frontend (Next.js + Tailwind)                 │
│   Job Seeker UI · Recruiter UI · Resume Builder · ATS Check    │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             │  HTTP / REST APIs
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Auth Layer / Middleware                       │
│              JWT Validation · Route Protection                  │
└──────────┬─────────────────┬──────────────────┬─────────────────┘
           │                 │                  │
           ▼                 ▼                  ▼
    ┌─────────────┐  ┌─────────────┐   ┌─────────────┐
    │  Auth Svc   │  │  User Svc   │   │   Job Svc   │
    │  Login      │  │  Profile    │   │  Jobs       │
    │  Register   │  │  Skills     │   │  Apply      │
    │  Forgot     │  │  Resume     │   │  Recruiter  │
    │  Reset      │  │  Account    │   │  Listings   │
    └──────┬──────┘  └──────┬──────┘   └──────┬──────┘
           │                │                  │
           └────────────────┼──────────────────┘
                            │
                            ▼
                  ┌──────────────────────┐
                  │   Payment Service    │
                  │   Plans / Billing    │
                  └──────────┬───────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │   Kafka Event Streaming      │
              │    Producers → Consumers     │
              └──────────────┬───────────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │    Utils Service     │
                  │  Mail · Notifs · AI  │
                  └────────┬─────┬───────┘
                           │     │
              ┌────────────┘     └────────────┐
              ▼                               ▼
    ┌──────────────────┐           ┌──────────────────┐
    │   PostgreSQL     │           │     Redis        │
    │   NeonDB         │           │  Cache / Tokens  │
    └──────────────────┘           └──────────────────┘
                             ▼
                  ┌──────────────────────┐
                  │     Cloudinary       │
                  │  Resumes / Images    │
                  └──────────────────────┘
```

---

## 🧩 Microservices Breakdown

### 1. Auth Service
Handles all authentication and security flows.
- User registration and login
- JWT access token issuance and validation
- Forgot password and secure email-based reset
- Route protection middleware

### 2. User Service
Manages all job seeker profile data.
- Profile creation and updates
- Skills management
- Resume upload and storage (via Cloudinary)
- Account settings

### 3. Job Service
Handles the entire job lifecycle for both seekers and recruiters.
- Job posting and management (Recruiter)
- Job listing, search, and filtering (Seeker)
- Job application submission
- Application status tracking

### 4. Payment Service
Manages subscription plans and billing.
- Plan selection for recruiter accounts
- Payment processing integration
- Plan expiry and renewal management

### 5. Utils Service (Kafka Consumer)
A background service that consumes Kafka events and handles:
- Email notifications (application updates, password reset, etc.)
- AI task execution (resume scoring, analysis, career guidance)
- Event logging and monitoring

---

## ⚡ Kafka Event Flow

```
Service (Producer)
     │
     │  publishes event e.g. "application.submitted"
     ▼
Kafka Topic
     │
     │  event consumed
     ▼
Utils Service (Consumer)
     │
     ├──▶  Send Email Notification
     └──▶  Trigger AI Task (ATS Score, Resume Analysis)
```

**Example Events:**
| Event | Producer | Consumer Action |
|---|---|---|
| `user.registered` | Auth Svc | Send welcome email |
| `password.reset.requested` | Auth Svc | Send reset link email |
| `application.submitted` | Job Svc | Notify recruiter, send confirmation |
| `resume.uploaded` | User Svc | Trigger ATS pre-analysis |
| `subscription.activated` | Payment Svc | Send confirmation email |

---

## 🤖 AI Features

### Resume Builder
- Interactive form-driven resume creation
- AI suggestions for each section (summary, skills, experience)
- Exports in ATS-optimized format
- Stored securely via Cloudinary

### Resume Analyzer
- Upload any resume for instant AI analysis
- Section-by-section feedback (contact, summary, skills, experience)
- Actionable suggestions to improve selection chances
- Compare against a target job description

### ATS Score Checker
- Paste any job description + upload your resume
- Get a match score (0–100)
- Identify missing keywords and skills
- Understand what recruiters' ATS systems see

### Career Guidance Engine
- Input current skills and target role
- AI generates a personalized learning roadmap
- Highlights skill gaps and recommended resources
- Suggests job titles aligned with current profile

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js** | React framework with SSR/SSG support |
| **Tailwind CSS** | Utility-first styling |
| **Axios** | HTTP client for API calls |

### Backend (Microservices)
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime for all services |
| **Express.js** | REST API framework |
| **JWT** | Authentication tokens |
| **bcrypt** | Password hashing |

### Messaging
| Technology | Purpose |
|---|---|
| **Apache Kafka** | Async event streaming between services |

### Database & Storage
| Technology | Purpose |
|---|---|
| **PostgreSQL (NeonDB)** | Primary relational database |
| **Redis** | Caching, session tokens, rate limiting |
| **Cloudinary** | Resume and image file storage |

### DevOps & Tooling
| Technology | Purpose |
|---|---|
| **dotenv** | Environment variable management |
| **Nodemon** | Development auto-reload |
| **Postman** | API testing |

---

## 📁 Project Structure

```
nexthire/
├── frontend/                   # Next.js + Tailwind frontend
│   ├── app/
│   │   ├── (auth)/             # Login, Register pages
│   │   ├── dashboard/          # Job seeker dashboard
│   │   ├── recruiter/          # Recruiter dashboard
│   │   ├── resume/             # Resume builder & analyzer
│   │   ├── jobs/               # Job listings
│   │   └── career/             # Career guidance
│   ├── components/             # Reusable UI components
│   ├── lib/                    # API helpers, utilities
│   └── public/                 # Static assets
│
├── services/
│   ├── auth-service/           # Auth Service
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   └── utils/
│   │   └── index.js
│   │
│   ├── user-service/           # User / Profile Service
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── models/
│   │   └── index.js
│   │
│   ├── job-service/            # Job & Application Service
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── models/
│   │   └── index.js
│   │
│   ├── payment-service/        # Subscription & Billing
│   │   ├── src/
│   │   └── index.js
│   │
│   └── utils-service/          # Kafka Consumer + AI Tasks
│       ├── src/
│       │   ├── consumers/      # Kafka consumers
│       │   ├── mailer/         # Email templates & sender
│       │   └── ai/             # AI task handlers
│       └── index.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL (or NeonDB cloud connection)
- Redis (local or cloud)
- Apache Kafka (local or cloud)
- Cloudinary account
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nexthire.git
cd nexthire
```

### 2. Environment Variables

Create a `.env` file in each service directory. Example for **auth-service**:

```env
PORT=4001
DATABASE_URL=postgresql://user:password@host/nexthire
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
REDIS_URL=redis://localhost:6379
KAFKA_BROKER=localhost:9092
```

Example for **utils-service**:

```env
PORT=4005
KAFKA_BROKER=localhost:9092
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USER=your@email.com
MAIL_PASS=your_password
ANTHROPIC_API_KEY=your_ai_key
```

### 3. Install Dependencies

Install dependencies for each service:

```bash
# Frontend
cd frontend && npm install

# Auth Service
cd services/auth-service && npm install

# User Service
cd services/user-service && npm install

# Job Service
cd services/job-service && npm install

# Payment Service
cd services/payment-service && npm install

# Utils Service
cd services/utils-service && npm install
```

### 4. Database Setup

Run migrations for each service that uses PostgreSQL:

```bash
# From each service directory
npm run migrate
```

### 5. Start All Services

Open a terminal for each service and run:

```bash
# Auth Service (port 4001)
cd services/auth-service && npm run dev

# User Service (port 4002)
cd services/user-service && npm run dev

# Job Service (port 4003)
cd services/job-service && npm run dev

# Payment Service (port 4004)
cd services/payment-service && npm run dev

# Utils Service / Kafka Consumer (port 4005)
cd services/utils-service && npm run dev

# Frontend (port 3000)
cd frontend && npm run dev
```

### 6. Open in Browser

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

```
User registers / logs in
        │
        ▼
Auth Service validates credentials
        │
        ▼
JWT access token issued
        │
        ▼
Token stored (Redis for revocation support)
        │
        ▼
All subsequent requests include Bearer token
        │
        ▼
Middleware validates token on every protected route
```

---

## 📬 Email Notification Flow

```
Any Service triggers an event
        │  (e.g. application.submitted)
        ▼
Kafka Producer publishes to topic
        │
        ▼
Utils Service Kafka Consumer picks up event
        │
        ▼
Mailer sends email using template
        │
        └──▶ Applicant: "Application received"
        └──▶ Recruiter: "New applicant for [Job Title]"
```

---

## 📸 Screenshots
![About NextHire](frontend/public/pic1.png)
![About NextHire](frontend/public/pic2.png)
![About NextHire](frontend/public/pic3.png)

| Page | Description |
|---|---|
| `/` | Landing page |
| `/register` | Job seeker & recruiter registration |
| `/dashboard` | Job seeker dashboard |
| `/resume/builder` | AI Resume Builder |
| `/resume/analyze` | Resume Analyzer & ATS Score |
| `/jobs` | Job listings and search |
| `/career` | Career guidance |
| `/recruiter/dashboard` | Recruiter hiring dashboard |
| `/recruiter/post-job` | Post a new job |

---

## 🗺️ Roadmap

- [x] Auth Service (Login, Register, Forgot/Reset Password)
- [x] User Service (Profile, Skills, Resume Upload)
- [x] Job Service (Post, Browse, Apply, Track)
- [x] Kafka-based Async Email Notifications
- [x] AI Resume Builder
- [x] ATS Score Checker
- [x] Resume Analyzer
- [x] Career Guidance Engine
- [x] Payment / Subscription Service
- [ ] Admin Dashboard
- [ ] Mobile App (React Native)
- [ ] Docker Compose for one-command setup
- [ ] CI/CD Pipeline (GitHub Actions)
- [ ] Kubernetes deployment config

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please make sure your code follows the existing service structure and includes relevant environment variable documentation.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgements

- [Apache Kafka](https://kafka.apache.org/) — event streaming backbone
- [NeonDB](https://neon.tech/) — serverless PostgreSQL
- [Cloudinary](https://cloudinary.com/) — media and file storage
- [Next.js](https://nextjs.org/) — the React framework for production
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS framework

---

<div align="center">

**Built with ❤️ to simulate real-world production systems**

⭐ Star this repo if you find it useful!

</div>