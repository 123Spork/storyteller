FROM node:11
COPY . .
CMD [ "npm", "install" ]
CMD [ "node", "build/app.js" ]
