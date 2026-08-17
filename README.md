# High End Service Desk

A single-page IT Helpdesk / Incident Management simulation built for an IT Support screen-recorded demo. It reproduces the core workflow of an enterprise service desk tool — ticket queue, ticket detail, live step-by-step troubleshooting, notes, activity timeline, user directory, knowledge base, reports, and settings — entirely in one self-contained HTML file with no build step or backend.

**[Live Demo](https://melandipam.github.io/High-end-service-desk/)**

## Features

- **Incident Queue** — searchable ticket table with status/priority badges
- **Interactive Live Troubleshooting** — tickets don't start "pre-solved." Each incident (software or hardware) walks the technician through a realistic, step-by-step diagnostic flow: confirm symptoms → run checks → apply a fix → verify with the user → document → resolve → close. Every step requires a real click before the next one unlocks, and the Activity Timeline updates live as each action is taken — built specifically so it can be screen-recorded as a genuine walkthrough rather than a pre-filled history.
- **User Directory** — technicians and end users with live open-ticket counts
- **Knowledge Base** — searchable troubleshooting articles by category/tag
- **Reports** — ticket volume by status, category, priority, and technician workload, computed live from ticket data
- **Settings** — profile info and toggleable notification/workflow preferences

## Tech

Plain HTML, CSS, and vanilla JavaScript. No frameworks, no dependencies, no build tools — open the file in any browser and it runs.

## Running Locally

Just open `index.html` in a browser. No install steps required.

## Notes

All data (tickets, notes, timeline, settings) lives in memory for the session — refreshing the page resets it to the starting state. This is intentional: it keeps every demo run identical and self-contained, with no backend or database to set up.

## License

MIT — free to use, modify, and adapt.
