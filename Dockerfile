FROM node:lts

COPY . .

RUN npm install --force

EXPOSE 3000

CMD [ "npm", "start" ]
