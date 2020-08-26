// Copyright 2017 The University of North Carolina at Chapel Hill
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ValueEntry from 'therapy-dog/utils/value-entry';
import Ember from 'ember';
import jQuery from 'jquery';

moduleForComponent('block-orcid', 'Integration | Component | Orcid block', {
  integration: true
});

let block = Ember.Object.create({
  type: 'orcid',
  key: 'orcid',
  label: 'Orcid Id',
  required: true
});

let optionalBlock = Ember.Object.create({
  type: 'orcid',
  key: 'orcid',
  label: 'Orcid Id'
});

test('it renders', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-orcid entry=entry}}`);

  assert.equal(jQuery('label').text().trim(), 'Orcid Id');
  assert.ok(jQuery('.block').hasClass('required'));
});

test('it updates the entry value when text is entered', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-orcid entry=entry}}`);

  jQuery('input').val('1234-1234-1234-1234');
  jQuery('input').change();

  assert.deepEqual(entry.get('value'), '1234-1234-1234-1234');
});

test('it is invalid with no text entered if required', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-orcid entry=entry}}`);

  assert.ok(jQuery('.block').hasClass('invalid'));

  jQuery('input').val('');
  jQuery('input').change();

  assert.ok(jQuery('.block').hasClass('invalid'));
});

test('it is invalid if an invalid orcid is entered', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-orcid entry=entry}}`);

  assert.ok(jQuery('.block').hasClass('invalid'));

  jQuery('input').val('123-1234-1234-1234');
  jQuery('input').change();

  assert.ok(jQuery('.block').hasClass('invalid'));
});

test('it is valid if an valid orcid is entered', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-orcid entry=entry}}`);

  assert.ok(jQuery('.block').hasClass('invalid'));

  jQuery('input').val('orcid.org/1234-1234-1234-1234');
  jQuery('input').change();

  assert.notOk(jQuery('.block').hasClass('invalid'));
});

test('it is valid with no text entered if not required', function(assert) {
  let entry = ValueEntry.create({ optionalBlock });
  this.set('entry', entry);

  this.render(hbs`{{block-orcid entry=entry}}`);

  assert.notOk(jQuery('.block').hasClass('invalid'));

  jQuery('input').val('');
  jQuery('input').change();

  assert.notOk(jQuery('.block').hasClass('invalid'));
});
