# A.C. Agent

A.C. Agent is a personalized, self-organizing AI tree. It gives you a single
place to dump anything — a thought, a task, a piece of info — and routes it
to the right part of your life automatically, where a dedicated branch takes
care of it.

## Concept

The system is structured as a tree of organizational branches, each mapped to
a personal process you need to manage (e.g. finances, health, projects,
errands, reading list, home maintenance — whatever branches you define).

- **Chat input (frontend)**: You type in a piece of info.
- **Branch selection**: You pick which branch it belongs to (or the system
  suggests one).
- **Branch-contained machine**: Each branch is self-contained — it has its
  own algorithm and its own AI responsible for that domain. The branch keeps
  its data organized, acts on what it's given, and makes sure everything
  routed to it has a defined place and gets handled correctly.

Every branch operates independently but reports into the same tree, so the
whole system stays organized without you having to manually file or manage
each piece of information yourself.

## Goals (draft)

- A single chat-style input for capturing anything, at any time.
- A branch structure that reflects real personal processes/domains.
- Each branch runs its own logic/AI tuned to what that branch needs to do
  with incoming info (store it, act on it, track it, remind about it, etc).
- Everything sent into the tree ends up somewhere sensible — nothing gets
  lost or left unsorted.
- The tree structure itself should be extensible: adding a new branch should
  be easy as new personal processes come up.

## Status

Early stage. This repository currently contains no code — the branch
structure, the per-branch agent design, and the frontend are still being
defined.

## Open questions

- How branches are defined and organized (fixed set vs. user-extensible tree,
  nesting/sub-branches).
- How auto-routing/suggestion of the right branch should work when the user
  doesn't pick one manually.
- What "algorithm + AI" means per branch — shared model with branch-specific
  context, vs. fully separate agents per branch.
- Where data lives and how branches read/write without conflicting with each
  other.
- Frontend platform/framework for the chat-input interface.