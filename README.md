# Hindu Learning Hub

Hindu Learning Hub is a web-based platform designed to provide educational resources, courses, and study materials on Hindu philosophy, culture, and traditions.

## Features

- **Courses Page**: Displays a list of courses with details like title, instructor, level, and more.
- **Study Materials**: Provides free resources such as text, audio, and study guides.
- **Backend API**: Handles data fetching and serves the client-side application.
- **Development Tools**: Uses Vite for fast development and React Query for data fetching.

---

## Codebase Overview

### Client

- **Location**: `/client`
- **Tech Stack**: React, TypeScript, React Query, Wouter (for routing).
- **Key Components**:
  - `CoursesPage.tsx`: Displays available courses.
  - `StudyMaterials.tsx`: Renders study materials with download options.

### Server

- **Location**: `/server`
- **Tech Stack**: Express.js, TypeScript.
- **Key Files**:
  - `index.ts`: Main server entry point.
  - `vite.ts`: Configures Vite for development and static serving.

### Configuration

- **Replit Config**: `.replit` file defines the development environment.
- **Port**: The app runs on port `5000` (mapped to external port `80`).

---

## Deployment on Vercel

### Prerequisites

1. Install [Vercel CLI](https://vercel.com/docs/cli).
2. Create a Vercel account.

### Steps

1. **Build the Client**:

   ```bash
   cd client
   npm install
   npm run build
   ```

   This generates a `dist` folder with the production build.

2. **Prepare the Server**:
   Ensure the server is configured to serve the client build:

   - Update `serveStatic` in `/server/vite.ts` to serve the `dist` folder.

3. **Deploy**:

   - Run the following command in the root directory:
     ```bash
     vercel
     ```
   - Follow the prompts to configure the project.

4. **Set Environment Variables**:
   - Add any required environment variables (e.g., API keys) in the Vercel dashboard.

---

## Maintenance

### Local Development

1. Start the development server:

   ```bash
   npm run dev
   ```

   This runs both the client and server.

2. Access the app at `http://localhost:5000`.

### Updating Dependencies

- Use `npm update` to update dependencies.
- Test thoroughly after updates.

### Debugging

- Use the logs provided by Vercel for production issues.
- For local debugging, check the console output of the server and client.

### Adding New Features

1. Create a new branch for the feature.
2. Follow the existing folder structure and coding conventions.
3. Test the feature locally before merging.

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request with a detailed description.

---

## License

This project is licensed under the MIT License.
