include .env
export

node_modules: package.json
	npm i

compile:
	npm run start

open:
	google-chrome ./dist/index.html

up: node_modules compile open

again: compile open
