.FROM node:12

Label maintainer=AyoubELJOURARI


WORKDIR /home/node/

COPY . ONCF-APP/

WORKDIR /home/node/ONCF-APP/

RUN npm install

CMD npm run start

EXPOSE 4000


