FROM imbios/bun-node:18-slim AS deps
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && \
  apt-get install -yq openssl git ca-certificates tzdata && \
  ln -fs /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM deps AS builder
WORKDIR /app
COPY . .

RUN bun run build

FROM node:18-slim AS runner
WORKDIR /app

ARG CONFIG_FILE
COPY $CONFIG_FILE /app/.env
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder  /app/.next/ ./

EXPOSE 3001

ENV PORT 3001

CMD ["node", "server.js"]
