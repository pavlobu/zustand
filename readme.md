# @pavlobu/zustand

This is a better zustand middleware by @pavlobu

### This project is based on https://github.com/pmndrs/zustand
Please read [original readme](https://github.com/pmndrs/zustand#readme)

# Improvements in this repo `devtools` middleware:
Demo react project with example of following improvements can be found [here](examples/dev-env-devtools-many-stores/)
* improve redux devtools usage. One redux devtools tab can be used for all stores
* use devtools extension only in non prod env
* add example/dev-env-devtools-many-stores with usage of this repo package
* backward compatibility with previous devtools middleware zustand api

---
## Demo of redux devtools rewind feature 
In this demo you can see a Redux Devtools Extension state rewind feature in action, when multiple zustand stores connected to one Redux Devtools Extension connection.
The code for this demo can be found here: [example/dev-env-devtools-many-stores](examples/dev-env-devtools-many-stores/)


![demo of zustand devtools middleware by pavlobu. showing how redux devtools rewind feature works](examples/dev-env-devtools-many-stores/docs/img/zustand-devtools-rewind.gif)

