# Node.js test project with json-server (with cars data :) ) 
## It is JS-front-app to ***REMIND npm, webpack, json-server, .env, MakeFile, tmuxinator***

> it is just extremely-simple test-app with cars DB from json-server; 
> 
>BTW **update-edytuj button not working** - to not waste time on html inputs

<br/><hr/>

# Run
## Start JSON server
```
cd json_server
make server
```

## Start project
```
make up
```

<br/><hr/>

# Preparing that project
## Check & Install BASICS: nodejs & npm
```
sudo apt update
sudo apt upgrade
nodejs -v                   // checking if installed
sudo apt install nodejs
nodejs -v
npm -v                      // checking if installed
sudo apt install npm
npm -v
```
## Install global applications
```
npm i -g webpack webpack-cli
npm i -g babel/loader
npm i -g json-server
```
## Create new WebPack with Babel & DotEnv project
```
npm init -y
npm i webpack webpack-cli -d
touch index.html            // & fill-in with proper content
touch index.js              // & join whith index.html   &   fill-in with proper content
touch webpack.config.js     // & fill-in with proper content
npm i clean-webpack-plugin -D
npm i html-webpack-plugin -D
npm i babel/loader -d
npm i @babel/preset-env -d
npm i dotenv-webpack -d
```
## Create git & Add to GitHub
```
git init
git remote add origin git@github.com:BergerMarcin/node_project_test_cars.git
```
