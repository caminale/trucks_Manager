FROM madnificent/ember:2.14.0 as ember
MAINTAINER Esteban Sastre <esteban.sastre@tenforce.com>

COPY . /app
RUN npm install && bower install
RUN ember build --environment=production


FROM semtech/mu-nginx-spa-proxy
COPY --from=ember /app/dist /app

