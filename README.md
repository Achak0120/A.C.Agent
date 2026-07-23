# The Grove

The Grove is a personalized, self-organizing AI tree. It gives you a single
place to dump anything — a thought, a task, a piece of info — and routes it
to the right part of your life automatically, where a dedicated branch takes
care of it.

## Concept

The system is structured as a tree of organizational branches, each mapped to
a personal process you need to manage (e.g. notes-to-self, recipes, projects,
errands, reading list, home maintenance, digital closet — whatever branches you define).

- **Chat input (frontend)**: You type in a piece of info.
- **Chat feedback (frontend)**: You can access another page where you can ask for the CEO-AI to access all branches in the tree and retrieve the information you wish to see
- **Branch selection**: You pick which branch it belongs to (or the system
  suggests one).
- **Branch-contained machine**: Each branch is self-contained — it has its
  own algorithm and its own organization system responsible for that domain which the
  User is able to define. The branch keeps
  its data organized, acts on what it's given, and makes sure everything
  routed to it has a defined place and gets handled correctly. Changes to the organization system for each branch will be changeable at any moment.

Every branch operates independently but reports into the same tree, so the
whole system stays organized without you having to manually file or manage
each piece of information yourself.

## Goals (draft)

- A single chat-style input for capturing anything, at any time.
- A single chat-style output for retrieving any information previously logged into a branch.
- A branch structure that reflects real personal processes/domains.
- Each branch runs its own logic/AI tuned to what that branch needs to do
  with incoming info (store it, act on it, track it, remind about it, etc).
- Everything sent into the tree ends up somewhere sensible — nothing gets
  lost or left unsorted.
- The tree structure itself should be extensible: adding a new branch should
  be easy as new personal processes come up.
- Users should be able to see their current Tree and view their branches + submission logs for chat inputs

## Status

Early stage: the branch structure, the per-branch agent design, and the frontend are still being
defined.

## Open questions

- How branches are defined and organized (fixed set vs. user-extensible tree,
  nesting/sub-branches).
- Where data lives and how branches read/write without conflicting with each
  other.
- Frontend platform/framework for the chat-input interface.
- How Users will be able to see and navigate their Tree and subprocesses
