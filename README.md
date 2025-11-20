# Starter Template - Full-Stack Monorepo

A modern full-stack monorepo built with pnpm workspaces, featuring Angular + Ionic for the frontend and NestJS for the backend.

## 🏗️ Project Structure

```
starter-template/
├── apps/
│   ├── frontend/       # Angular + Ionic app
│   └── backend/        # NestJS API
├── packages/           # Shared packages
│   ├── shared/         # Common types, DTOs, interfaces
│   ├── utils/          # Shared utility functions
│   └── config/         # Shared configuration
├── pnpm-workspace.yaml # pnpm workspace configuration
└── package.json        # Root package.json
```

## 🚀 Tech Stack

### Frontend
- **Angular** (v20+) - Modern web framework
- **Ionic** (v8+) - Cross-platform UI components
- **Capacitor** (v7+) - Native runtime for iOS/Android
- **TypeScript** - Type-safe development

### Backend
- **NestJS** (v11+) - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **Express** - HTTP server

### Monorepo
- **pnpm** - Fast, disk space efficient package manager
- **pnpm workspaces** - Monorepo management

## 📋 Prerequisites

Make sure you have the following installed:

```bash
# Node.js (v18+)
node --version

# pnpm (v9+)
npm install -g pnpm
pnpm --version

# Angular CLI (global)
pnpm install -g @angular/cli

# NestJS CLI (global)
pnpm install -g @nestjs/cli

# Ionic CLI (global)
pnpm install -g @ionic/cli
```

### macOS Note (node@24)

If you installed `node@24` via Homebrew, you may need to add it to your PATH:

```bash
echo 'export PATH="/opt/homebrew/opt/node@24/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

## 🔧 Installation

### Option 1: Clone This Repository

```bash
git clone <your-repo-url>
cd starter-template
pnpm install
```

This will install dependencies for all workspaces (frontend, backend, and shared packages).

### Option 2: Create From Scratch

If you want to recreate this setup from scratch:

#### 1. Create Frontend (Angular + Ionic)

```bash
# Create Angular app
ng new frontend --package-manager=pnpm
# Choose: Sass (SCSS)
# SSR: NO
# Zoneless: NO
# AI tools: cursor (optional)

cd frontend

# Install Capacitor
pnpm install @capacitor/core
pnpm install -D @capacitor/cli

# Install Ionic
pnpm install @ionic/angular@latest
ng add @ionic/angular
```

#### 2. Create Backend (NestJS)

```bash
# From root directory
nest new backend
# Choose: pnpm
```

#### 3. Setup Monorepo

Create `pnpm-workspace.yaml` in the root:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

Create root `package.json`:

```json
{
  "name": "starter-template",
  "private": true,
  "scripts": {
    "frontend": "pnpm --filter frontend start",
    "backend": "pnpm --filter backend start",
    "dev": "pnpm run --parallel --filter frontend --filter backend start"
  }
}
```

Move your apps into `apps/` directory:

```bash
mkdir -p apps
mv frontend apps/
mv backend apps/
```

Install all dependencies:

```bash
pnpm install
```

## 🏃 Running the Applications

### Run Frontend Only

```bash
pnpm frontend
# or
cd apps/frontend && pnpm start
```

Frontend will be available at: `http://localhost:4200`

### Run Backend Only

```bash
pnpm backend
# or
cd apps/backend && pnpm start
```

Backend API will be available at: `http://localhost:3000`

### Run Both (Recommended)

```bash
pnpm dev
```

This runs both frontend and backend in parallel.

## 🏗️ Building

### Build All Applications

```bash
pnpm build
```

### Build Specific App

```bash
# Frontend
pnpm --filter frontend build

# Backend
pnpm --filter backend build
```

## 🧪 Testing

### Run All Tests

```bash
pnpm test
```

### Test Specific App

```bash
# Frontend
pnpm --filter frontend test

# Backend
pnpm --filter backend test
```

## 🎨 Linting

### Lint All Applications

```bash
pnpm lint
```

### Lint Specific App

```bash
# Frontend
pnpm --filter frontend lint

# Backend
pnpm --filter backend lint
```

## 📦 Adding Shared Packages

To create a new shared package:

1. Create a new directory in `packages/`
2. Add a `package.json` with a unique name (e.g., `@starter/shared`)
3. Run `pnpm install` at the root
4. Import in your apps using the package name

Example:

```typescript
// In frontend or backend
import { MyType } from '@starter/shared';
```

## 🔗 Workspace Commands

### Add Dependency to Specific App

```bash
# Add to frontend
pnpm --filter frontend add <package-name>

# Add to backend
pnpm --filter backend add <package-name>

# Add to root (dev dependencies)
pnpm add -D -w <package-name>
```

### Remove Dependency

```bash
pnpm --filter <app-name> remove <package-name>
```

## 📱 Mobile Development (Capacitor)

To build for mobile platforms:

### First Time Setup

```bash
cd apps/frontend

# Initialize Capacitor (if not already done)
npx cap init

# Add platforms
npx cap add ios
npx cap add android
```

### Building and Syncing

```bash
cd apps/frontend

# Build the Angular app
pnpm build

# Sync code to native projects
npx cap sync

# Open in native IDE
npx cap open ios      # Opens Xcode
npx cap open android  # Opens Android Studio
```

### Running on Device

```bash
# iOS (requires Xcode and macOS)
npx cap run ios

# Android (requires Android Studio)
npx cap run android
```

## 🌐 Environment Variables

### Backend

Create `.env` file in `apps/backend/`:

```env
PORT=3000
NODE_ENV=development
```

### Frontend

Configure in `apps/frontend/src/environments/`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

MIT

## 🆘 Troubleshooting

### Node command not found (after Homebrew install)

If you installed node via Homebrew and get "command not found":

```bash
# Add node@24 to PATH
echo 'export PATH="/opt/homebrew/opt/node@24/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify
node --version
```

### pnpm install fails

```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and lockfiles
rm -rf node_modules apps/*/node_modules apps/*/pnpm-lock.yaml pnpm-lock.yaml

# Reinstall
pnpm install
```

### Port already in use

```bash
# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 4200 (frontend)
lsof -ti:4200 | xargs kill -9
```

### CORS issues

Make sure `app.enableCors()` is present in `apps/backend/src/main.ts`:

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Add this line
  await app.listen(process.env.PORT ?? 3000);
}
```

### Frontend can't connect to backend

1. Make sure backend is running: `pnpm backend`
2. Check backend is on port 3000: `http://localhost:3000`
3. Check CORS is enabled (see above)
4. Verify the API URL in frontend code matches: `http://localhost:3000`

### Ionic components not showing

Make sure you've imported Ionic components in your Angular component:

```typescript
import { IonButton, IonCard } from '@ionic/angular/standalone';

@Component({
  imports: [IonButton, IonCard],
  // ...
})
```

## 📚 Learn More

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Angular Documentation](https://angular.dev)
- [Angular AI Best Practices](https://angular.dev/ai/develop-with-ai)
- [Ionic Documentation](https://ionicframework.com/docs)
- [Ionic Angular](https://ionicframework.com/docs/angular/overview)
- [NestJS Documentation](https://docs.nestjs.com)
- [Capacitor Documentation](https://capacitorjs.com/docs)

## 🎯 Quick Start Checklist

- [ ] Install Node.js (v18+)
- [ ] Install pnpm globally
- [ ] Install Angular CLI globally
- [ ] Install NestJS CLI globally
- [ ] Install Ionic CLI globally
- [ ] Clone repository
- [ ] Run `pnpm install` at root
- [ ] Start backend: `pnpm backend`
- [ ] Start frontend: `pnpm frontend`
- [ ] Open browser: `http://localhost:4200`
- [ ] Click "Send Request to Backend" button to test connection

