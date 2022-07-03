FROM node:latest AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN ["chmod", "+x", "./init.sh"]

ENTRYPOINT [ "./init.sh" ]