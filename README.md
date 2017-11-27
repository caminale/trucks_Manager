# trucks_Manager
Projet client server 


# Contents
* [docker](#docker)
* [authentification](#authentification)



# docker:

installation project
------------------
To start the back :
```
cd <project-name>
docker-compose up
```
if docker compose is not installed click [here](https://docs.docker.com/compose/install/)

connection to robo3t: 
```
address : localhost:27027
```
installation mongo 
------------------


add our user to a group docker (sudo), you need to restart your computer.

```
sudo usermod -a -G docker $USER
```
The first step is to pull the image from Docker Hub :
```
docker pull mongo:latest
```
Then need to specify to docker, a locale path /opt/mongodb/db to bind  /data/db (default stockage path for mongodb)
```
sudo mkdir -p /opt/mongodb/db 
```
Second step is to run the images, to create a container : 

```
docker run -p 27017:27017 -v /opt/mongodb/db:/data/db --name my-mongo-dev -d mongo mongod --auth
```
create user admin
------------------


If you want to create any user : 

The docker exec command runs a new command in a running container, permit us to launch client mongo in the container.

```
docker exec -it my-mongo-dev mongo
```
create a super-admin which permit to create/manage other user (writer/reader) 
------------------

```
use admin

db.createUser({user: "camelot", pwd: "0205", roles: [{role: "userAdminAnyDatabase", db: "admin"}]})

```
add user for our db(w+r) :
------------------

first you need to launch mongo client with the super-admin :
```
mongo <ip_server> -u siteUserAdmin -p unPasswordQuiVaBien --authenticationDatabase admin
```
Then we switch to our db, which we want to use here truck-api

```
use truck-api

db.createUser({user: "camelot", pwd: "0205", roles: ["dbOwner"]})

```
commands
------------------



In order to delete all images, use the given command
```
docker rmi $(docker images -q)
```

In order to delete all containers, use the given command
```
docker rm $(docker ps -a -q)
```

# authentification:

This tuto help us a lot for the authentification : 
[ici](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)



