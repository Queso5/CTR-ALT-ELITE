# NexusFlow Project Context

## Overview
NexusFlow is a full-stack hackathon project designed to streamline innovation management and project tracking for administrators and innovators. The platform features a modern React (TypeScript) frontend styled with Tailwind CSS, a Kanban board for project management, and an admin dashboard for analytics and oversight. The backend is planned to use Flask and Firebase (Auth, Firestore, Storage), with future integration of LLMs (e.g., Gemini API) for document parsing and summarization.

## Key Features
- **Kanban Board**: Drag-and-drop project management with domain and budget filtering, project modals, and document attachment.
- **Admin Dashboard**: Analytics widgets, project table with search, sort, and advanced budget filtering (slider and min/max inputs), project detail modals, and document management.
- **Authentication**: Planned login/signup UI (Firebase Auth).
- **PDF Parsing & LLM Summarization**: Planned features for extracting and summarizing project documents.
- **Responsive UI**: Built with Tailwind CSS and custom UI components.

## Tech Stack
- **Frontend**: React (TypeScript), Tailwind CSS, Vite, react-beautiful-dnd, ReactModal
- **Backend**: Flask (planned), Firebase (Auth, Firestore, Storage)
- **LLM Integration**: Gemini API (planned)
- **Build Tools**: Vite, npm

## Main Components
- `src/components/KanbanBoard.tsx`: Kanban board UI, drag-and-drop, project modals, budget/domain filtering, document upload.
- `src/components/AdminDashboard.tsx`: Admin analytics, project table, search/sort/filter, budget slider modal, project/document modals.
- `src/components/pages/`: Page-level routing for admin, dashboard, landing, etc.
- `src/components/ui/`: Reusable UI primitives (Button, Card, Table, etc.).
- `src/components/hooks/`: Custom React hooks (e.g., use-toast, use-mobile).
- `src/components/lib/`: Utility and integration code (e.g., firebase.ts).

## Filtering & Search Logic
- **Kanban Board**: Projects can be filtered by domain (tags), search term, and budget (slider, up to $5M). Filters are combined.
- **Admin Dashboard**: Projects can be filtered by search, min/max budget, or a slider (slider takes precedence if active). Sort by budget, date, progress, or title.

## Project Data Model (Frontend)
```
interface KanbanProject {
  id: string;
  title: string;
  description: string;
  status: string; // e.g., 'Idea & Research', 'IPR Filing', etc.
  tags: string[];
  collaborators: string[];
  budget?: string; // e.g., '$120,000'
}
```

## Example Project Statuses
- Idea & Research
- IPR Filing
- Startup / Commercialization
- Profitable Business

## Example Project Table Columns (Admin)
- Project Title
- Innovator Name
- Status
- Budget
- Progress (visual bar)
- Date Created

## UI/UX Highlights
- Modern, responsive design with Tailwind.
- Modals for project details, document upload, and budget filtering.
- Analytics widgets for total innovators, projects, and project status distribution.
- Consistent filtering UI (slider and min/max) across Kanban and Admin dashboards.

## Planned/Upcoming Features
- PDF parsing and LLM summarization for project documents.
- Full authentication and user management (Firebase).
- Firestore integration for real-time project data.
- Enhanced project insight and analytics using LLMs.

## File Structure (Key Parts)
```
CTR-ALT-ELITE/
  components.json
  package.json
  tailwind.config.js/ts
  vite.config.ts
  public/
    ...
  src/
    App.tsx, main.tsx, index.tsx, ...
    components/
      KanbanBoard.tsx
      AdminDashboard.tsx
      ...
      ui/
        button.tsx, card.tsx, table.tsx, ...
      hooks/
        use-toast.ts, use-mobile.tsx
      lib/
        firebase.ts, utils.ts
      pages/
        Admin.tsx, Dashboard.tsx, ...
```

## Usage
This file provides a high-level context for LLMs or researchers to understand the structure, features, and logic of the NexusFlow project. For code-level details, see the main component files and UI primitives in `src/components/`.
