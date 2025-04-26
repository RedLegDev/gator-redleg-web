# Gator Redleg Website

https://gatorredleg.org

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

---

## Project Structure

- `src/` - Main source code
  - `pages/` - Top-level pages for routing (React Router)
  - `components/` - Reusable UI components (including `ui/` for shadcn/ui components)
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
  - `App.tsx` - Main app, sets up providers and routes
- `public/` - Static assets (images, favicon, etc.)
- `staticwebapp.config.json` - Azure Static Web Apps configuration

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint on the codebase

## Code Style & Linting

- ESLint is configured for TypeScript and React (`eslint.config.js`).
- Run `npm run lint` before committing.
- Uses recommended React Hooks and React Refresh rules.

## Routing

- Uses [React Router](https://reactrouter.com/) for client-side routing.
- All routes are defined in `src/App.tsx`.
- 404s are handled by a catch-all route.

## State Management & Data Fetching

- Uses [@tanstack/react-query](https://tanstack.com/query/latest) for data fetching and caching.

## Styling

- [Tailwind CSS](https://tailwindcss.com/) with custom configuration (`tailwind.config.ts`)
- [shadcn/ui](https://ui.shadcn.com/) for accessible UI components
- Custom color palette for "redleg" and "artillery" branding

## Static Assets

- Place images and other static files in the `public/` directory.
- Favicon and Open Graph image are included by default.

## Deployment

- Configured for [Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/) via `staticwebapp.config.json`.
- SPA fallback and custom routes are set up in this config.

## Environment Variables

- No required environment variables as of now. If you add any, document them here.

## Contributing

- Please use clear commit messages and run `npm run lint` before pushing.
- Open issues or pull requests for discussion and improvements.

## What technologies are used for this project?

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Query
- React Router
