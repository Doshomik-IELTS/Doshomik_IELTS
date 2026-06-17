# ARCHITECTURE.md

# Doshomik IELTS Architecture

## System Overview

Doshomik IELTS is an AI-powered IELTS learning platform consisting of:

* Web Application
* Authentication Service
* Learning Engine
* AI Evaluation Engine
* Analytics Layer
* Content Management Layer

---

## High-Level Architecture

```text
Client
   │
   ▼
Next.js Frontend
   │
   ├── Server Actions
   ├── API Routes
   │
   ▼
Application Layer
   │
   ├── Auth Service
   ├── Learning Service
   ├── AI Service
   ├── Analytics Service
   │
   ▼
Database Layer
(PostgreSQL + Prisma)
```

---

## Core Domains

### User Domain

Responsible for:

* Registration
* Login
* Profile
* Progress
* Subscription

### Learning Domain

Responsible for:

* Flashcards
* Vocabulary Sets
* Quizzes
* Practice Tests

### AI Domain

Responsible for:

* Writing Feedback
* Speaking Feedback
* Tutor Chat
* Study Recommendations

### Analytics Domain

Responsible for:

* Learning Metrics
* Engagement Metrics
* Retention Metrics

---

## Feature Modules

```text
features/
├── auth/
├── vocabulary/
├── flashcards/
├── quizzes/
├── reading/
├── listening/
├── speaking/
├── writing/
├── ai-tutor/
├── dashboard/
└── analytics/
```

---

## Database Strategy

Primary Database:

PostgreSQL

ORM:

Prisma

Migration Strategy:

Prisma Migrations Only

No manual schema edits.

---

## Authentication

Preferred:

* Better Auth

Fallback:

* NextAuth

Authentication Methods:

* Email
* Google
* GitHub (Admin Only)

---

## AI Layer

Providers should be abstracted.

```typescript
interface AIProvider {
  generate()
  evaluate()
  stream()
}
```

Never couple business logic to one model provider.

---

## Storage

Store:

* Audio uploads
* User avatars
* Generated assets

Use S3-compatible storage.

---

## Monitoring

Required:

* Sentry
* PostHog

Track:

* Errors
* User flows
* Learning events

---

## Scaling Strategy

Phase 1:

Monolithic deployment

Phase 2:

Service extraction if needed

Do not microservice prematurely.
