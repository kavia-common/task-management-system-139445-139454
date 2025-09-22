Corporate Navy Todo Frontend - Technical Notes

Architecture
- Routing: react-router-dom v6, routes in App.js
- State:
  - AuthContext: token and user in localStorage, actions: login, register, logout
  - TodoContext: items, filters, CRUD actions; automatically fetches on filters change and auth token presence
- API:
  - Base client in src/api/client.js with JSON handling and error propagation
  - Auth endpoints in src/api/auth.js
  - Todos endpoints in src/api/todos.js
- UI:
  - Header with brand, theme toggle, and auth controls
  - Sidebar with filters
  - Main content with search, add form, and list

Error Handling
- API errors throw with status and data; UI surfaces messages.
- Form validation in TodoForm for required title and length checks.

Styling
- CSS variables and files in src/styles/* for maintainability
- Classic corporate look: crisp cards, subtle shadows, navy/gold accents

Environment
- REACT_APP_API_BASE for backend base URL
