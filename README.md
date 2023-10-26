## What is this?

This is a sample project, a take-home task.

## how to run it?

The repo is based on [nx](https://nx.dev/) so after downloading and installing the dependencies via `npm install` all you need todo is run `npx nx run-many --target=serve` this will run the api server on port 3030 and frontend via webkit on port 4200.

To build and pack the app just run npm run build, which will transpile both frontend and backend into the dist folder and copy the package.json file so that we can later build a docker image for deployment
