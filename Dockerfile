FROM octohost/nodejs-nginx
WORKDIR /srv/www/generated-folder-here

## dependencies
RUN npm install -g react-native-cli
ADD package.json /srv/www/generated-folder-here/
RUN npm install --production

## add the app
ADD images  /srv/www/generated-folder-here/images
ADD index.ios.js /srv/www/generated-folder-here/index.ios.js
ADD lib  /srv/www/generated-folder-here/lib
ADD components  /srv/www/generated-folder-here/components
RUN mkdir iOS

## build
RUN react-native bundle --minify

EXPOSE 80
CMD nginx
