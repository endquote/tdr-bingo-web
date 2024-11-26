FROM node:18.12-alpine3.17
ENV PNPM_VERSION=8.6.1
RUN apk add curl
RUN curl -L https://unpkg.com/@pnpm/self-installer | node
COPY . .
RUN pnpm install
RUN pnpm build
CMD ["node", ".output/server/index.mjs"]
EXPOSE 3000
