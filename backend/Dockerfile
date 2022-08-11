FROM node:alpine 
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .
RUN yarn global add @nestjs/cli
RUN yarn 

COPY . .
CMD ["yarn", "start"]
