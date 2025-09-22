# Corporate Navy Todo Frontend (React)

A classic, professional todo management UI with authentication (JWT), filters sidebar, and CRUD features. Styled using a corporate navy palette (navy blue with gold accents), built with React, React Router, and Context for state.

## Features

- Auth: Login, Register, Logout with JWT stored in localStorage
- Todos: List, Create, Update, Delete
- Filters: Search, status, and priority filters in a sidebar
- Layout: Header (brand + auth actions), Sidebar, Content, Footer
- Styling: Pure CSS using CSS variables (no heavy UI frameworks)
- Docs & Comments: Public interfaces documented throughout the code

## Quick Start

1) Install dependencies
   npm install

2) Configure API base URL
   - Copy .env.example to .env and set REACT_APP_API_BASE to your backend URL (e.g. http://localhost:3001)

3) Run the app
   npm start

Open http://localhost:3000

## Project Structure

- src/api/*           - API client and endpoint wrappers
- src/state/*         - React Context for auth and todos
- src/components/*    - Reusable components (Header, Sidebar, forms, etc.)
- src/pages/*         - Page-level components
- src/styles/*        - Theme, layout, and form CSS

## Theming

Corporate Navy theme is defined in src/styles/theme.css using CSS variables:
- Primary: #1E3A8A (navy)
- Secondary: #F59E0B (gold)
- Background, surfaces, borders, shadows and radii are centralized for consistency.

Toggle light/dark theme using the header button. Preference is saved to localStorage.

## Environment Variables

- REACT_APP_API_BASE: Base URL of backend (e.g., http://localhost:3001)

Note: Do not commit secrets. Only define and use env variables through .env mapped by your orchestrator.

## Notes

- All public functions are marked with PUBLIC_INTERFACE and documented.
- Error handling provides user-visible messages where appropriate.
- ID handling is flexible: supports id, _id, or uuid fields.

