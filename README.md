# todoodler-auth-server
authetication and authorization for todoodler app

#Database

in dev mode, run mongoDB as docker by pasting the following in the terminal:
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.4.0-rc8

to run mongo in the shell, type 'docker exec -it mongodb bash' and then 'mongo'