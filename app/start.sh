#!/bin/sh

HTTP_PORT=3000
if [ -n "$PORT" ]; then
  HTTP_PORT=$PORT
fi

yarn start -p $HTTP_PORT
