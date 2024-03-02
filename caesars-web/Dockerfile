FROM node:18-alpine as base
# FROM node:20-alpine3.17
WORKDIR /home/caesars_ui_1/app

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn build

# remove dev dependencies
# RUN npm prune --production
# FROM node:alpine
# WORKDIR /home/caesars_ui_1/app
# copy from build image
# COPY --from=BUILD_IMAGE /home/caesars_ui_1/app/package.json ./package.json
# COPY --from=BUILD_IMAGE /home/caesars_ui_1/app/node_modules ./node_modules
# COPY --from=BUILD_IMAGE /home/caesars_ui_1/app/.next ./.next
# COPY --from=BUILD_IMAGE /home/caesars_ui_1/app/public ./public
EXPOSE 80

CMD ["yarn", "start"]

# ----------
# EXPOSE 3000
# RUN yarn start
# ------

# CMD ["yarn", "start"]


# FROM base as production

# ENV NODE_PATH=./build

# EXPOSE 8080

# RUN yarn dev


# # Use the official Node.js image as the base image
# # FROM node:14
# # FROM node:18-alpine as base

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./

# # Install project dependencies
# RUN yarn install

# # Copy all project files to the container
# COPY . .

# # Build the Next.js application
# RUN npm run build

# # Expose the port that Next.js is running on (default is 8080)
# EXPOSE 3000

# # Start the Next.js application
# CMD ["yarn", "dev"]
