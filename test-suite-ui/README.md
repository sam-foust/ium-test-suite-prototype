# Test Suite UI

React + Vite + TypeScript frontend for viewing manual test suites.

## Requirements

- Node.js 18+ and npm

## Installation

```bash
npm install
```

## Running the Application

1. **Start the Backend API**
   First, make sure the .NET API is running (default: `http://localhost:5000`)

2. **Start the Frontend**
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
src/
├── components/        # React components
│   ├── TestSuiteList.tsx
│   └── TestSuiteDetail.tsx
├── pages/            # Page components
│   ├── HomePage.tsx
│   └── TestSuitePage.tsx
├── services/         # API services
│   └── api.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── App.tsx           # Main app component
├── main.tsx          # Entry point
├── App.css           # Application styles
└── index.css         # Global styles
```

## Features

- **Test Suite List**: Browse all available test suites with card-based layout
- **Test Suite Detail**: View comprehensive test case information
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Professional styling with status badges and organized sections
- **Type Safety**: Full TypeScript support

## Environment Variables

Create a `.env` file in the root directory to configure the API URL:

```
VITE_API_BASE_URL=http://localhost:5000
```

If not set, it defaults to `http://localhost:5000`.

## Technology Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router**: Navigation
- **Axios**: HTTP client
- **CSS**: Custom styling (no framework dependencies)


