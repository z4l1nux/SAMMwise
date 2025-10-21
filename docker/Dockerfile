# Etapa 1: Instalar dependências
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Etapa 2: Construir o projeto
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && npm prune --production

# Etapa 3: Imagem de produção
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Criar usuário não root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copiar arquivos necessários do builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/messages ./messages

# Configurar permissões
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3500
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3500

CMD ["npm", "run", "start"]
