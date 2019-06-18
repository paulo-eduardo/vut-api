FROM node:slim as common
WORKDIR /api
COPY package.json yarn.lock /api/
RUN yarn
COPY . .

### STAGE 1: Dev ###
FROM node:slim as dev
COPY --from=common /api /api
WORKDIR /api
CMD ["yarn", "dev"]

### STAGE 2: Test ###
FROM node:slim as test
COPY --from=common /api /api
WORKDIR /api
CMD ["yarn", "test"]

### STAGE 2: Deploy ###
FROM node:slim as deploy
COPY --from=common /api /api
WORKDIR /api
RUN yarn build
CMD ["yarn", "serve"]