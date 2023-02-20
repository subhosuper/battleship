FROM node:lts

ENV APP_PATH /src

COPY . ${APP_PATH}

WORKDIR ${APP_PATH}

RUN npm install --force

EXPOSE 3000

CMD [ "npm", "start" ]
