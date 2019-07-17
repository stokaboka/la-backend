#!/bin/sh

NODE_ENV=development

npm install

npm run build

# NODE_ENV=production

sudo pm2 start ecosystem.config.js --only svs-la --env production

exit 0
