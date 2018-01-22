FROM node:8.9.4

WORKDIR /usr/src/app
COPY src ./src/
COPY package.json ./

RUN npm install --production

CMD ["npm", "start"]