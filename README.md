# Home Finder Portfolio

A modern, interactive real estate and property listing portfolio application built with React and Vite.

##  Technologies Used

This project leverages a modern tech stack to deliver a fast, responsive, and aesthetically pleasing user experience:

- **Framework:** [React 18](https://react.dev/), [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Routing:** React Router
- **Data Fetching:** React Query (@tanstack/react-query)
- **Forms & Validation:** React Hook Form, Zod
- **Mapping:** Leaflet, React Leaflet
- **Animations:** Framer Motion, Embla Carousel
- **Charts:** Recharts
- **Testing:** Vitest, React Testing Library

##  Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd home-finder-portfolio
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
   *(Note: This project also contains a `bun.lockb` file, so you can alternatively use `bun install` if you prefer Bun.)*

### Running the Development Server

Start the local development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or the port specified by Vite in the terminal).

##  Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the application for production.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs ESLint to scan for generic and react-specific issues.
- `npm run test`: Runs the automated test suite using Vitest.
- `npm run test:watch`: Runs tests in interactive watch mode.
