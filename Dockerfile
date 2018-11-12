# Docker file is a list of intructions for making

# This is the layer we want to start our sandwich
# Because we've written in JS, we want to use node

# Alpine is the linux distro that this node was written on
FROM node:11.0.0-alpine

# Make a folder in your image where your app's source code can live
RUN mkdir -p /src/app

# Tell your computer where your app's source code will live
WORKDIR /src/app

# What source code do you want to copy, and where do you want to put it?
# . means copy everything to /src/app
COPY . /src/app

# Do you have any dependencies that need to run
RUN npm install --production
# --production only installs the regular dependencies
# Make sure to put React/React-dom in DEV DEPENDENCIES (b/c React is not needed for server, unless you served up your index file)
# It may be better to load React as an external script instead of NPM
# So move everything you may not need to DEV DEPENDENCIES

# Could consider adding this in it's own image
# RUN mysql <schema.sql
# RUN npm run seed
# This is for when we run this on our client

# What port will the container use to talk to the outside world
EXPOSE 3000

# How do you start your app
CMD ["npm", "run", "start"]
# Can only have *one* CMD line in your Dockerfile