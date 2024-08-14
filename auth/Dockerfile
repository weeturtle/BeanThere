FROM node:20.15.0-alpine AS dependencies

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

FROM dependencies AS builder

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN yarn prisma generate
RUN yarn build

FROM dependencies AS deploy
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

CMD ["yarn", "start"]
