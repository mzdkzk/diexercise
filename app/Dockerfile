FROM node:14-slim

RUN apt update && \
  apt install -y mecab libmecab-dev mecab-ipadic-utf8 sudo git make curl xz-utils file

RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git /tmp/neologd
RUN /tmp/neologd/bin/install-mecab-ipadic-neologd -n -y -p /neologd
RUN rm -rf /tmp/neologd
RUN apt remove -y --purge git make curl xz-utils file

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/
RUN yarn

COPY . /app/
RUN yarn build

RUN yarn --production
RUN yarn cache clean

RUN chmod +x /app/start.sh
CMD ["/app/start.sh"]
