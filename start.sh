#!/bin/sh

NODE_ENV=development

npm install

npm run build

sudo pm2 delete svs-la
sudo pm2 start ecosystem.config.js --only svs-la --env production

exit 0
