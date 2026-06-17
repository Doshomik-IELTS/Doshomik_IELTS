# AI_RULES.md

# AI Agent Operating Rules

## Purpose

This file governs all autonomous coding agents working on Doshomik IELTS.

Applies to:

* Codex
* OpenCode
* Claude Code
* Gemini CLI
* Cursor Agents
* Future AI systems

These rules override personal preferences and temporary implementation shortcuts.

---

# Rule 1: Read Before Writing

Before modifying code:

1. Read AGENT.md
2. Read ARCHITECTURE.md
3. Read PRODUCT.md
4. Read SYSTEM_DESIGN.md

Never implement blindly.

---

# Rule 2: Preserve Existing Architecture

Do not introduce:

* New patterns
* New state systems
* New architectures

unless explicitly required.

Consistency beats novelty.

---

# Rule 3: Folder Ownership

```text
src/
 ├── app/
 ├── components/
 ├── features/
 ├── services/
 ├── lib/
 ├── hooks/
 ├── actions/
 ├── types/
 └── utils/
```

Follow existing structure.

Do not invent folders.

---

# Rule 4: Component Standards

Maximum responsibilities:

One component = One concern

Bad:

```tsx
DashboardPage
```

handling:

* API calls
* forms
* analytics
* rendering

Good:

Split responsibilities.

---

# Rule 5: Business Logic Location

Business logic belongs in:

```text
services/
```

Never inside:

```text
components/
```

---

# Rule 6: Database Rules

Use Prisma only.

Never:

* Write raw SQL unless unavoidable
* Duplicate queries
* Ignore indexes

Every schema change requires migration.

---

# Rule 7: TypeScript Rules

Forbidden:

```typescript
any
```

Avoid:

```typescript
as unknown as
```

Prefer:

```typescript
interface
type
zod
```

---

# Rule 8: API Rules

Every endpoint must:

* Validate input
* Validate output
* Handle errors
* Return typed responses

Use Zod validation.

---

# Rule 9: Styling Rules

Use:

* TailwindCSS
* ShadCN UI

Avoid:

* Inline styles
* Custom CSS files unless necessary

---

# Rule 10: Accessibility Rules

All UI must support:

* Keyboard navigation
* Labels
* Semantic HTML
* Screen readers

Accessibility is mandatory.

---

# Rule 11: Testing Rules

Every feature requires:

Unit Tests

Integration Tests

Critical workflows require:

E2E Tests

---

# Rule 12: Dependency Rules

Before adding a package:

Ask:

1. Can existing code solve this?
2. Is bundle size affected?
3. Is maintenance worth it?

Prefer fewer dependencies.

---

# Rule 13: Documentation Rules

Every major feature must update:

* Documentation
* Architecture notes
* Relevant README sections

Documentation debt is technical debt.

---

# Rule 14: AI Code Review Checklist

Before generating code:

Verify:

* Naming consistency
* Type safety
* Error handling
* Mobile responsiveness
* Accessibility
* Security

---

# Rule 15: Naming Conventions

Components:

```text
PascalCase
```

Hooks:

```text
useSomething
```

Actions:

```text
verbNoun
```

Examples:

```text
createQuiz
submitWriting
startSession
```

Database Models:

```text
PascalCase
```

Database Fields:

```text
camelCase
```

---

# Rule 16: Forbidden Practices

Never:

* Commit secrets
* Disable TypeScript
* Ignore ESLint
* Skip validation
* Hardcode credentials
* Introduce dead code
* Leave TODOs without issues

---

# Rule 17: Performance Rules

Prioritize:

* Server Components
* Streaming
* Lazy loading
* Efficient queries

Avoid:

* Unnecessary client components
* N+1 queries
* Overfetching

---

# Rule 18: Security Rules

Always:

* Validate inputs
* Escape outputs
* Verify permissions
* Protect user data

Never trust client input.

---

# Rule 19: Product Alignment

Before implementing any feature ask:

Does this improve IELTS learning?

If not:

Do not build it.

---

# Rule 20: Final Directive

Act like a senior founding engineer.

Optimize for:

* Clarity
* Maintainability
* Reliability
* Scalability
* Educational value

Do not optimize for cleverness.

Simple systems survive.
