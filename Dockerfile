FROM iojs
ADD package.json /app/
WORKDIR /app
RUN npm install
ADD images  /app/images
ADD index.ios.js /app/index.ios.js
ADD lib  /app/lib
ADD components  /app/components
EXPOSE 8081
CMD node_modules/react-native/packager/packager.sh
