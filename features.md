# Features - Authenticated User Structure

## Purpose

This document defines the signed-in learner experience for Doshomik IELTS.

The current `study.html` vocabulary tool works as a local, anonymous prototype. Authenticated users need a server-backed structure that persists progress across devices, supports IELTS module practice, and prepares the product for AI feedback, analytics, credits, and future mobile apps.

## Product Principles

- Learner first: every authenticated feature must help a user learn, practise, evaluate, or track IELTS progress.
- Mobile first: authenticated flows must work comfortably on low-end Android browsers.
- Simple state: keep business logic in services and keep UI components focused on rendering.
- Trust: never present estimated bands as official IELTS results.
- Privacy: keep learner recordings, answers, attempts, and feedback private by default.

## Authenticated Roles

| Role | Purpose | Access |
| --- | --- | --- |
| Learner | Primary IELTS user | Dashboard, vocabulary, flashcards, quizzes, IELTS modules, attempts, feedback, profile |
| Admin | Content and operations user | Content review, user support, analytics, moderation, settings |
| Instructor | Future classroom supplement role | Group progress, assigned sets, learner summaries |

MVP should implement `Learner` and basic `Admin`. `Instructor` is deferred.

## Authenticated Navigation

### Desktop Shell

```text
Header
  Logo
  Dashboard
  Vocabulary
  Practice
  Mock Tests
  Feedback
  Profile menu

Main
  Route content

Mobile bottom/nav
  Home
  Study
  Practice
  Progress
  Profile
```

### Mobile Shell

Mobile authenticated navigation should prioritize repeated study actions:

```text
Top bar
  Logo / current page title
  Streak badge
  Profile button

Bottom nav
  Dashboard
  Vocabulary
  Practice
  Attempts
  Profile
```

## Route Map

| Route | Auth | Phase | Purpose |
| --- | --- | --- | --- |
| `/login` | Guest | Phase 0 | Email/social login |
| `/register` | Guest | Phase 0 | Account creation |
| `/onboarding` | Learner | Phase 0 | Target band, exam date, current level, focus modules |
| `/dashboard` | Learner | Phase 1 | Main authenticated home |
| `/vocabulary` | Learner | Phase 1 | Word sets, categories, search |
| `/vocabulary/[setId]` | Learner | Phase 1 | Set overview and study modes |
| `/flashcards/[setId]` | Learner | Phase 1 | Flashcard session |
| `/learn/[setId]` | Learner | Phase 1 | Adaptive learn mode |
| `/test/[setId]` | Learner | Phase 1 | Vocabulary test mode |
| `/match/[setId]` | Learner | Phase 1 | Matching game |
| `/blast/[setId]` | Learner | Phase 1 | Speed recall game |
| `/practice` | Learner | Phase 2 | IELTS module practice hub |
| `/practice/reading` | Learner | Phase 2 | Reading passages and question sets |
| `/practice/listening` | Learner | Phase 2 | Audio drills and question sets |
| `/practice/writing` | Learner | Phase 2 | Task 1 and Task 2 submissions |
| `/practice/speaking` | Learner | Phase 2 | Audio recording and speaking prompts |
| `/mock-tests` | Learner | Phase 2 | Full IELTS-style tests |
| `/attempts` | Learner | Phase 1 | Attempt history |
| `/attempts/[attemptId]` | Learner | Phase 1 | Attempt detail |
| `/attempts/[attemptId]/score` | Learner | Phase 2 | Estimated score and feedback |
| `/feedback` | Learner | Phase 2 | Writing/speaking feedback inbox |
| `/saved` | Learner | Phase 1 | Saved resources and bookmarked words |
| `/profile` | Learner | Phase 0 | Profile, target band, preferences |
| `/settings` | Learner | Phase 0 | Account, privacy, notifications |
| `/admin` | Admin | Phase 1 | Admin dashboard |

## Dashboard Structure

The authenticated dashboard is the primary learner home.

### Dashboard Modules

| Module | MVP | Description |
| --- | --- | --- |
| Next best action | Yes | One clear action based on recent progress |
| Streak card | Yes | Current streak, longest streak, today status |
| Target band card | Yes | Current estimate, target band, exam date |
| Study progress | Yes | Vocabulary, reading, listening, writing, speaking completion |
| Weak areas | Yes | Topics/modules needing review |
| Recent attempts | Yes | Last quiz, flashcard, writing, speaking, mock attempts |
| Saved resources | Yes | Bookmarked sets, words, lessons |
| Achievements | Later Phase 1 | Badges for consistency and completion |
| Credits | Phase 2 | Evaluation/mock-test credit balance |
| AI tutor prompt | Phase 3 | Personalized question or study suggestion |

### Dashboard Layout

```text
/dashboard

Top
  Welcome back, {name}
  Streak badge
  Target band summary

Primary action
  Continue today's plan

Progress grid
  Vocabulary
  Reading
  Listening
  Writing
  Speaking

Weak areas
  3-5 focused recommendations

Recent activity
  Attempts and feedback

Saved
  Bookmarked resources
```

## Onboarding Structure

First login should collect enough information to personalize the dashboard without creating friction.

### Required Fields

| Field | Type | Purpose |
| --- | --- | --- |
| Display name | Text | Personalization |
| Current level | Select | Beginner, intermediate, advanced |
| Target band | Select | 5.5 to 9.0 |
| Exam date | Optional date | Study plan urgency |
| Focus modules | Multi-select | Reading, listening, writing, speaking, vocabulary |
| Native language | Optional select | Bangla support and explanations |

### Onboarding Steps

```text
1. Goal
   Target band + exam date

2. Baseline
   Current level + weak modules

3. Preferences
   Daily study target + language preference

4. Start
   Create first study plan
```

## Authenticated Study Modes

The existing `study.html` modes should become server-backed sessions.

### Mode Structure

| Mode | Authenticated Upgrade |
| --- | --- |
| Flashcards | Save known/review state per user and set |
| Learn | Save mastery state, wrong answers, adaptive queue |
| Test | Save score, time, skipped questions, review list |
| Match | Save best time per set and difficulty |
| Blast | Save high score, level reached, weak words |
| Blocks | Optional future mode if Blast is not enough |

### Session Flow

```text
Open study mode
  -> Create StudySession
  -> Load set words and user's progress
  -> User studies
  -> Save per-answer events
  -> Complete session
  -> Update mastery, streak, dashboard, analytics
```

## Progress Model

Authenticated progress must move from `localStorage` to database-backed state.

### Core Progress Concepts

| Concept | Description |
| --- | --- |
| Study session | A single active use of a mode |
| Study event | Per-card or per-question interaction |
| Mastery | Word/module confidence level |
| Attempt | Completed quiz/test/mock submission |
| Streak | Daily learning continuity |
| Weak area | Derived from repeated mistakes |

### Progress States

```text
new
learning
review
mastered
weak
```

### Suggested Mastery Rules

| Event | Effect |
| --- | --- |
| Correct first try | Increase mastery |
| Correct after hint | Small increase |
| Incorrect | Move to review or weak |
| Repeated incorrect | Mark weak area |
| Mastered twice across days | Mark mastered |

## Data Model Additions

The existing system design includes `User`, `VocabularySet`, `VocabularyWord`, `FlashcardSession`, and `QuizAttempt`. Authenticated learning needs these additional entities.

### Profile

```typescript
LearnerProfile {
  id: string
  userId: string
  displayName: string
  currentLevel: "beginner" | "intermediate" | "advanced"
  targetBand: number
  examDate?: Date
  nativeLanguage?: string
  dailyStudyMinutes: number
  createdAt: Date
  updatedAt: Date
}
```

### Study Session

```typescript
StudySession {
  id: string
  userId: string
  setId: string
  mode: "flashcards" | "learn" | "test" | "match" | "blast"
  status: "active" | "completed" | "abandoned"
  startedAt: Date
  completedAt?: Date
  durationSeconds?: number
  score?: number
}
```

### Word Progress

```typescript
WordProgress {
  id: string
  userId: string
  wordId: string
  setId: string
  state: "new" | "learning" | "review" | "mastered" | "weak"
  correctCount: number
  wrongCount: number
  lastStudiedAt?: Date
  nextReviewAt?: Date
}
```

### Study Event

```typescript
StudyEvent {
  id: string
  userId: string
  sessionId: string
  wordId?: string
  questionId?: string
  eventType: "shown" | "flipped" | "correct" | "incorrect" | "skipped" | "hint_used"
  response?: string
  responseTimeMs?: number
  createdAt: Date
}
```

### Streak

```typescript
LearnerStreak {
  id: string
  userId: string
  currentStreak: number
  longestStreak: number
  lastStudyDate?: Date
  updatedAt: Date
}
```

### Saved Resource

```typescript
SavedResource {
  id: string
  userId: string
  resourceType: "vocabulary_set" | "word" | "lesson" | "practice" | "mock_test"
  resourceId: string
  createdAt: Date
}
```

## API Structure

All authenticated routes must validate session and ownership.

### Auth

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create user |
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/auth/logout` | Logout |
| `GET` | `/api/me` | Current user and profile |

### Profile

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/profile` | Read learner profile |
| `PATCH` | `/api/profile` | Update learner profile |
| `POST` | `/api/onboarding` | Complete onboarding |

### Dashboard

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/dashboard` | Summary cards, progress, next action |
| `GET` | `/api/activity` | Recent study events and attempts |

### Vocabulary and Study

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/vocabulary/sets` | List sets with user progress |
| `GET` | `/api/vocabulary/sets/[setId]` | Set detail with progress |
| `POST` | `/api/study/sessions` | Start session |
| `PATCH` | `/api/study/sessions/[sessionId]` | Complete/abandon session |
| `POST` | `/api/study/events` | Save per-card/question event |
| `GET` | `/api/progress/words` | Word-level progress |
| `POST` | `/api/resources/save` | Save/bookmark resource |
| `DELETE` | `/api/resources/save` | Remove bookmark |

### IELTS Attempts

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/attempts` | Attempt list |
| `GET` | `/api/attempts/[attemptId]` | Attempt detail |
| `POST` | `/api/practice/[module]/attempts` | Start module attempt |
| `PATCH` | `/api/practice/[module]/attempts/[attemptId]` | Save draft or submit |

## Permissions and Privacy

### Learner Data Rules

- A learner can only read and mutate their own profile, progress, sessions, attempts, saved resources, and feedback.
- Admins may view operational summaries but should not casually expose private recordings or full learner answers.
- Speaking audio must use signed upload/download URLs.
- Answer keys must never be returned to learner-facing APIs before submission.
- Estimated bands must be labeled as unofficial.

### Authorization Matrix

| Resource | Learner | Admin |
| --- | --- | --- |
| Own profile | Read/write | Support read |
| Own progress | Read/write | Support read |
| Own attempts | Read/write draft, read submitted | Support read |
| Answer keys | No direct access | Review access only |
| Audio uploads | Own signed access | Limited support access |
| Content authoring | No | Yes |

## Analytics Events

Use PostHog behind environment flags.

| Event | Properties |
| --- | --- |
| `auth_login` | method |
| `onboarding_completed` | targetBand, focusModules |
| `study_session_started` | mode, setId |
| `study_session_completed` | mode, setId, durationSeconds, score |
| `word_answered` | mode, wordId, correct, responseTimeMs |
| `quiz_completed` | quizId, score, durationSeconds |
| `practice_attempt_submitted` | module, attemptId |
| `writing_feedback_received` | taskType, estimatedBandRange |
| `speaking_feedback_received` | promptType, estimatedBandRange |
| `dashboard_next_action_clicked` | actionType |

## MVP Authenticated User Scope

### Phase 0 - Auth Foundation

- Register, login, logout
- Profile
- Onboarding
- Protected app shell
- Session-aware navigation

Acceptance criteria:

- Guest users cannot access `/dashboard`.
- Logged-in users can update profile and onboarding data.
- Mobile navigation works with keyboard and touch.

### Phase 1 - Vocabulary and Dashboard

- Server-backed vocabulary sets
- Flashcards, learn, test, match, blast sessions
- Word progress
- Streaks
- Dashboard summary
- Saved resources

Acceptance criteria:

- User progress persists after logout/login.
- Progress works across devices.
- Dashboard shows next action and recent activity.
- Local `study.html` progress can be migrated or reset gracefully.

### Phase 2 - IELTS Core

- Reading attempts
- Listening attempts
- Writing submissions
- Speaking audio submissions
- Mock test attempts
- Estimated band feedback

Acceptance criteria:

- Writing and speaking feedback is stored per user.
- Full predicted overall band is only shown after the required attempt is complete.
- Learner APIs do not expose answer keys.

### Phase 3 - AI Native

- AI tutor
- Personalized study plan
- Weakness detection
- Adaptive review schedule

Acceptance criteria:

- AI recommendations are explainable.
- Feedback never claims official IELTS examiner authority.
- Provider abstraction allows model changes without rewriting product logic.

## UI Structure for Authenticated Pages

### Shared Components

```text
components/
  app-shell/
    authenticated-header
    mobile-bottom-nav
    profile-menu
    streak-badge
  dashboard/
    next-action-card
    progress-summary
    weak-areas
    recent-activity
  study/
    mode-tabs
    session-progress
    answer-feedback
  attempts/
    attempt-card
    score-summary
    feedback-panel
```

### Feature Ownership

```text
features/
  auth/
  dashboard/
  vocabulary/
  flashcards/
  quizzes/
  reading/
  listening/
  writing/
  speaking/
  mock-tests/
  progress/
  analytics/
```

Business logic should live in `services/`, not inside UI components.

## Migration From Current Prototype

### Current State

- `index.html` is the marketing/landing page prototype.
- `study.html` is an anonymous local vocabulary prototype.
- Progress is stored in `localStorage` under `doshomik_study_progress`.

### Migration Plan

1. Keep `study.html` as a visual/interaction reference.
2. Move vocabulary data into a server data source.
3. Create authenticated `StudySession`, `StudyEvent`, and `WordProgress` records.
4. On first login, offer to import local progress if present.
5. After import, server progress becomes the source of truth.

### Local Progress Import Shape

```typescript
LocalStudyProgress {
  flashcardProgress: {
    known: string[]
    review: string[]
  }
  learnProgress: {
    mastered: string[]
    attempted: string[]
    correct: number
    wrong: number
  }
  matchBestTime: number | null
  blastHighScore: number
}
```

## Testing Requirements

### Unit Tests

- Progress state transitions
- Streak updates
- Dashboard summary calculation
- Study session completion
- Ownership checks

### Integration Tests

- Login -> onboarding -> dashboard
- Start study session -> answer words -> complete session
- Save resource -> appears in saved list
- Submit writing attempt -> feedback stored

### E2E Tests

- Guest cannot access authenticated pages.
- Learner can complete a vocabulary learning workflow.
- Progress remains after reload.
- Mobile bottom nav can reach core routes.
- Answer keys are not visible before submission.

## Open Product Decisions

| Decision | Recommendation |
| --- | --- |
| Auth provider | Better Auth first, NextAuth fallback |
| Social login | Google for learners, GitHub only for admins |
| Credits in MVP | Defer until writing/speaking AI feedback ships |
| Instructor accounts | Defer until classroom use is validated |
| Community features | Defer; avoid becoming social media |
| Public profile pages | Defer; learner privacy first |

## Immediate Next Build Order

1. Auth shell and protected routes.
2. Onboarding and profile.
3. Dashboard summary API.
4. Server-backed vocabulary sets.
5. Study sessions and word progress.
6. Saved resources.
7. Attempt history.
8. Writing/speaking submissions.

This order keeps the authenticated experience usable early while preserving a clean path toward the full IELTS platform.
