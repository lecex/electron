# 编译环境
FROM node as builder

WORKDIR /go/src/github.com/lecex/electron
COPY . .
RUN npm install
RUN npm run build:web

# 运行环境
FROM nginx:alpine

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
WORKDIR /usr/share/nginx/html
COPY --from=builder /go/src/github.com/lecex/electron/dist/web .
COPY run.sh /docker-entrypoint.d
RUN chmod +x /docker-entrypoint.d/run.sh
# CMD [ "./run.sh" ]