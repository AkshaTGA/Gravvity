FROM node:20-alpine AS base

# Stage 1: Install dependencies for both projects
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy lockfiles and package configs for both applications
COPY model/package.json model/package-lock.json* model/yarn.lock* model/pnpm-lock.yaml* ./model/
COPY my-app/package.json my-app/package-lock.json* my-app/yarn.lock* my-app/pnpm-lock.yaml* ./my-app/

# Install dependencies for model
WORKDIR /app/model
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else npm install; \
  fi

# Install dependencies for my-app
WORKDIR /app/my-app
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else npm install; \
  fi

# Stage 2: Rebuild the source code
FROM base AS builder
WORKDIR /app

# Copy installed node_modules
COPY --from=deps /app/model/node_modules ./model/node_modules
COPY --from=deps /app/my-app/node_modules ./my-app/node_modules

# Copy the entire workspace into the container so the prebuild hook succeeds
COPY model ./model
COPY my-app ./my-app

# (Optional) If you have NEXT_PUBLIC_ variables needed during build time, declare them here:
# ARG NEXT_PUBLIC_BACKEND_URL
# ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

WORKDIR /app/my-app
ENV NEXT_TELEMETRY_DISABLED=1

# This runs the prebuild hook (sync-metaverse.mjs), compiling the 3D metaverse 
# and placing it correctly into /app/my-app/public before Next.js builds.
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else npm run build; \
  fi

# Stage 3: Production image (Next.js standalone)
FROM base AS runner
WORKDIR /app/my-app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# The public directory now contains the bundled metaverse-sim!
COPY --from=builder /app/my-app/public ./public

# Your next.config.ts correctly uses output: "standalone", so this will work perfectly:
COPY --from=builder --chown=nextjs:nodejs /app/my-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/my-app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]