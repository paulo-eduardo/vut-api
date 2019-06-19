FROM node:slim as common
WORKDIR /api
COPY package.json yarn.lock /api/
RUN yarn
COPY . .

### STAGE 1: Dev ###
FROM node:slim as dev
COPY --from=common /api /api
WORKDIR /api
EXPOSE 3000
CMD ["yarn", "dev"]

### STAGE 2: Deploy ###
FROM node:slim as deploy
COPY --from=common /api /api
WORKDIR /api
EXPOSE 3000
CMD ["yarn", "serve"]