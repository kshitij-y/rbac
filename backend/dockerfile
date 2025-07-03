FROM node:20-alpine

WORKDIR /backend

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY . .

RUN npx prisma generate

CMD ["node", "src/index.js"] 