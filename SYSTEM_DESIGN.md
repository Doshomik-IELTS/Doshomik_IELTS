# SYSTEM_DESIGN.md

# Doshomik IELTS System Design

## Overview

Doshomik IELTS is designed as a modular monolith with clearly separated domains.

The architecture prioritizes:

* Scalability
* Maintainability
* AI-assisted development
* Fast iteration
* Mobile-first performance

---

# System Context

```text
Users
  │
  ▼
Next.js Frontend
  │
  ▼
Application Layer
  │
  ├── Authentication
  ├── Vocabulary Engine
  ├── Flashcard Engine
  ├── Quiz Engine
  ├── IELTS Modules
  ├── AI Services
  └── Analytics
  │
  ▼
PostgreSQL Database
```

---

# Core Entities

## User

```typescript
User {
  id
  email
  name
  avatar
  role
  createdAt
}
```

Relationships:

* Has many flashcard sessions
* Has many quiz attempts
* Has many writing submissions
* Has many speaking submissions

---

## Vocabulary Set

```typescript
VocabularySet {
  id
  title
  description
  difficulty
  category
}
```

---

## Vocabulary Word

```typescript
VocabularyWord {
  id
  word
  meaning
  example
  pronunciation
}
```

---

## Flashcard Session

```typescript
FlashcardSession {
  id
  userId
  setId
  startedAt
  completedAt
}
```

---

## Quiz

```typescript
Quiz {
  id
  title
  difficulty
}
```

---

## Quiz Attempt

```typescript
QuizAttempt {
  id
  userId
  quizId
  score
}
```

---

## Writing Submission

```typescript
WritingSubmission {
  id
  userId
  taskType
  prompt
  answer
  feedback
}
```

---

## Speaking Submission

```typescript
SpeakingSubmission {
  id
  userId
  audioUrl
  transcript
  feedback
}
```

---

# Feature Flow

## Vocabulary Learning Flow

```text
User
 ↓
Vocabulary Set
 ↓
Flashcards
 ↓
Practice
 ↓
Review
 ↓
Progress Update
```

---

## Writing Flow

```text
User Submission
 ↓
AI Evaluation
 ↓
Feedback Generation
 ↓
Storage
 ↓
Dashboard
```

---

## Speaking Flow

```text
Audio Upload
 ↓
Transcription
 ↓
AI Evaluation
 ↓
Feedback
 ↓
Progress Update
```

---

# API Design

## Principles

* REST-like routes
* Predictable responses
* Strong validation
* Typed contracts

---

## Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "error": {
    "message": ""
  }
}
```

---

# Caching Strategy

Cache:

* Vocabulary sets
* Public content
* Dashboard summaries

Do not cache:

* User-sensitive information
* Authentication state

Preferred:

* Next.js cache
* Redis (future)

---

# Event Tracking

Track:

* Login
* Session Start
* Flashcard Completion
* Quiz Completion
* Writing Submission
* Speaking Submission

Analytics provider:

PostHog

---

# Storage Strategy

Store externally:

* Audio files
* User avatars
* Static assets

Do not store binary data in PostgreSQL.

---

# Security Design

Every endpoint must:

* Validate inputs
* Validate authorization
* Rate limit sensitive routes
* Sanitize outputs

---

# Scalability Path

Phase 1

Monolith

Phase 2

Separate AI service

Phase 3

Separate analytics pipeline

Never split services before actual scaling needs emerge.

---

# Failure Philosophy

Fail safely.

Prefer:

* Graceful degradation
* Meaningful error messages
* Retry mechanisms

Avoid:

* Silent failures
* Hidden exceptions
