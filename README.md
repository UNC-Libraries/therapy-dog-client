# Therapy Dog - Client (Deposit Forms)

![Build](https://github.com/UNC-Libraries/therapy-dog-client/workflows/Build/badge.svg)

This is a Node.js and Ember application that provides:

  - flexible forms for collecting files and metadata,
  - an expression language for mapping form input to MODS and other XML schemas, and
  - routines for packaging and submitting METS deposits to the CDR.

## Setup for client for development

#### Note: This application also requires [therapy-dog-server](https://github.com/UNC-Libraries/therapy-dog-server) to work correctly.

Install Client Dependencies:

    make deps

Start the client:

    make run-client

This application also requires the therapy-dog server app. 
In a separate terminal, clone that app and follow its readme to for installing it. 
Then start the API server:

    make run-server

Visit <http://localhost:4200/forms/test-form> in your browser.

## Setup for building client for forms only (not doing development)

Rather than installing dependencies using `make deps` as above:

    cd client && npm install

 start the client:

    make run-client

This application also requires the therapy-dog server app.
In a separate terminal install and start the API server:

    make run-server


Visit <http://localhost:4200/forms/test-form> in your browser.

## Setup for collaboration

This README outlines the details of collaborating on this Ember application.

#### Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

#### Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

#### Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

#### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

#### Running Tests

* `ember test`
* `ember test --server`

#### Building

* `ember build` (development)
* `ember build --environment production` (production)

#### Deploying

Specify what it takes to deploy your app.

#### Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Documentation

See server side application to generate documentation.

### If `make` is unavailable

Start the client:

    cd client && npm start

This application also requires the therapy-dog server app.
In a separate terminal install and start the API server:

    cd server && npm start

## Check before you commit

Run `ember test --server or in a browser go to http://localhost:4200/tests (Runs client side integration tests)` before committing.

## How to add dependencies to client

The source code for some dependencies is added to the repository:

  - for the client, Bower components and anything in the vendor/ directory

Add or remove dependencies separately from code changes. This makes reviewing a merge request a little easier, since we can look at our own code in separate commits.

`git log --oneline` should look like this: (most recent at top)

    bbbbbbb Remove 'left-pad' dependency from server.
    aaaaaaa Implement NIH left-padding to avoid dependency on 'left-pad'.
    1234567 Ensure output is left-padded.
    abcdefg Add 'left-pad' dependency to server.

### To add a Bower component to client

    bower install --save DOMPurify
    git add bower.json bower_components/DOMPurify
    git commit -m "Add 'DOMPurify' Bower component to client."

### To add a vendor dependency to client

    git add vendor/normalize.css
    git commit -m "Add 'normalize.css' vendor dependency to client."

### How to run tests

    ember test --server or in a browser go to http://localhost:4200/tests (Runs client side integration tests)
    
### License Information
Copyright 2017 The University of North Carolina at Chapel Hill

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
