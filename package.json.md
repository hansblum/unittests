## Unittests node module description

## Introduction

This is the `npm` package description of unittests. unittests is a small NodeJS project, which purpose is to explain how to unit test your node module. 

## Usage

After you cloned this repository with `git clone https://github.com/hansblum/unittests.git`, you perform all unit tests with the following commands: 

```
  git clone https://github.com/hansblum/unittests
  cd unittests
  npm install
  npm test
```

Explanation of the commands:

 `git clone https://github.com/hansblum/unittests`  Clone the repository to your local computer.
 `cd unittests`  Go into the workspace folder.
 `npm install`  Download all dependencies and build the node module.
 `npm test`  Run the tests.
 

```
{
  "name": "unittests",
  "version": "1.0.0",
  "description": "An example on how to build unit tests",
  "license": "MIT",
  "scripts": {
    "test": "gulp test"
  },
  "author": "Hans Blum",
  "license": "MIT",
  "devDependencies": {
    "chai": "^3.5.0",
    "gulp": "^3.9.1",
    "gulp-istanbul": "^0.10.4",
    "gulp-mocha": "^2.2.0",
    "mocha": "^2.4.5",
    "phantomjs-prebuilt": "^2.1.7",
    "sinon": "^1.17.3"
  },
  "dependencies": {
    "mongoose": "^4.4.17"
  }
}
```