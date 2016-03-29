'use strict';

const inspect = require('util').inspect;
const Form = require('../models/form');
const generateBundle = require('../deposit/generate-bundle');
const generateSubmission = require('../deposit/generate-submission');
const submitZip = require('../deposit/submit-zip');

exports.create = function(req, res) {
  let deposit = req.body;
  let form, values, bundle;

  Form.findById(deposit.form)
  .then(function(f) {
    form = f;

    return form.transformValues(deposit.values);
  })
  .then(function(v) {
    values = v;
    console.log(inspect(values, { depth: null }));

    bundle = generateBundle(form, values);
    console.log(inspect(bundle, { depth: null }));

    return generateSubmission(form, bundle);
  })
  .then(function(submission) {
    Object.keys(submission).forEach(function(name) {
      if (submission[name] instanceof Buffer) {
        console.log(name, submission[name].toString());
      } else {
        console.log(name, submission[name]);
      }
    });

    return submitZip(form, submission, {
      baseUrl: process.env.DEPOSIT_BASE_URL,
      username: process.env.DEPOSIT_USERNAME,
      password: process.env.DEPOSIT_PASSWORD
    });
  })
  .then(function(result) {
    res.send(result).end();
  })
  .catch(function(err) {
    console.error(err.stack);
    res.status(500).send({ errors: [{ title: 'Internal server error' }] });
  });
};
