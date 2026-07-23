# A.C. Agent

A.C. Agent is an iOS assistant agent for iPhone. It runs on-device (or in close
coordination with the device), takes typed requests from the user in natural
language, and carries out the requested changes directly on the phone —
acting as a hands-on assistant with access to the device's apps, settings,
and data rather than just answering questions about them.

## Concept

Instead of only describing how to do something, A.C. Agent does it:

- You type a request (e.g. "turn on Focus mode until 5pm" or "add these three
  contacts").
- The agent interprets the request.
- The agent performs the corresponding action(s) on the iPhone.

## Status

Early stage. This repository currently contains no code — project structure,
architecture, and scope are still being defined.

## Goals (draft)

- Accept free-form typed requests from the user.
- Translate requests into concrete actions on the device.
- Operate across iOS system features and installed apps where permitted.
- Confirm and execute changes safely, with the user in control of what the
  agent is allowed to touch.

## Non-goals / open questions

- Exact scope of "access to everything" (which iOS APIs, entitlements, and
  permissions are realistically available to a third-party app).
- How requests are parsed/executed (on-device model vs. calling out to an
  LLM).
- Safety and confirmation model for destructive or sensitive actions.

*this file was created by Claude Code
