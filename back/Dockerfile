
FROM node:lts

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm i

RUN npm cache clean --force

COPY . .

EXPOSE 3065
CMD [ "npm", "run","start" ]