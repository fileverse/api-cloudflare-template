FROM node:20-slim
WORKDIR /app

# Install build tools for native addons (better-sqlite3 still a transitive dep)
COPY package.json ./
RUN apt-get update && apt-get install -y python3 make g++ \
    && npm install --production \
    && apt-get purge -y python3 make g++ \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

COPY index.js .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 8001

# No DB_PATH needed — using DATABASE_URL for PostgreSQL
ENV NODE_ENV=production
ENV PORT=8001

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
  CMD node -e "fetch('http://localhost:8001/ping').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

ENTRYPOINT ["./entrypoint.sh"]
