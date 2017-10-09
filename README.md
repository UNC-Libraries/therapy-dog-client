# Therapy Dog (Deposit Forms)

This is a Node.js and Ember application that provides:

  - flexible forms for collecting files and metadata,
  - an expression language for mapping form input to MODS and other XML schemas, and
  - routines for packaging and submitting METS deposits to the CDR.

## Setup for development

Install Node.js.

If you are using Homebrew on macOS:

    brew install node4-lts

If you are using Git for Windows, install Node.js using the v4.x.x LTS package available at <https://nodejs.org/en/>.

Install Dependencies:

    make deps

Start the client:

    make run-client

This application also requires the therapy-dog server app. 
In a separate terminal, clone that app and follow its readme to for installing it. 
Then start the API server:

    make run-server

Visit <http://localhost:4200/forms/test-form> in your browser.

## Setup for building forms only (not doing development)

Install Node.js as above.

Rather than installing dependencies using `make deps` as above:

    cd client && npm install

 start the client:

    make run-client

This application also requires the therapy-dog server app.
In a separate terminal, start the API server:

    make run-server


Visit <http://localhost:4200/forms/test-form> in your browser.

## Documentation

See server side application to generate documentation.

### If `make` is unavailable

This application also requires the therapy-dog server app. Make sure 
 the example forms and vocabularies are copied into place:

    cp server/data/forms/article.json.example server/data/forms/article.json
    cp server/data/forms/catalog.json.example server/data/forms/catalog.json
    cp server/data/forms/test-form.json.example server/data/forms/test-form.json
    cp server/data/vocabularies/genre.json.example server/data/vocabularies/genre.json
    cp server/data/vocabularies/genre.json.example server/data/vocabularies/issuance.json
    cp server/data/vocabularies/language.json.example server/data/vocabularies/language.json
    cp server/data/vocabularies/role.json.example server/data/vocabularies/role.json

Start the client:

    cd client && npm start

In a separate terminal, start the API server:

    cd server && npm start

## Check before you commit

Run `ember test --server or in a browser go to http://localhost:4200/tests (Runs client side integration tests)` before committing.

## How to add dependencies

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
