# 🚀 Vercel Deployment Guide

## Fast Builds (Default)
By default, Vercel will skip Sanity typegen for faster builds (2-3 minutes instead of 5-8 minutes).

## When You Change Sanity Schemas

### Option 1: Vercel Dashboard (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `SKIP_TYPEGEN`
   - **Value**: `false`
   - **Environment**: Production
4. Redeploy your project

### Option 2: Commit Updated Types
1. Run locally: `pnpm run typegen`
2. Commit the updated `sanity.types.ts` file
3. Push to trigger deployment

### Option 3: Temporary Override
Add this to your commit message to temporarily enable typegen:
```bash
git commit -m "Update schema [TYPEGEN]"
```

## Build Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `pnpm run build` | Standard build | Local development |
| `pnpm run build:fast` | Fast build (no typegen) | Regular deployments |
| `pnpm run build:with-typegen` | Full build (with typegen) | Schema changes |

## Environment Variables

| Variable | Value | Effect |
|----------|-------|--------|
| `SKIP_TYPEGEN=true` | Default | Skips Sanity typegen (faster) |
| `SKIP_TYPEGEN=false` | When needed | Runs Sanity typegen (slower) |
| `VERCEL_ENV=production` | Auto-set | Production environment |

## Troubleshooting

### Build Fails After Schema Changes
1. Set `SKIP_TYPEGEN=false` in Vercel dashboard
2. Or run `pnpm run typegen` locally and commit the updated types

### Build Still Too Slow
1. Check if you have unnecessary dependencies
2. Consider using dynamic imports for heavy components
3. Optimize images and assets
