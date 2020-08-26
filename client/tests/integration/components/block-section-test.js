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
import ArrayEntry from 'therapy-dog/utils/array-entry';
import Ember from 'ember';
import jQuery from 'jquery';

moduleForComponent('block-section', 'Integration | Component | Section block', {
  integration: true
});

let authorsSectionBlock = Ember.Object.create({
  type: 'section',
  key: 'authors',
  label: 'Authors',
  repeat: true,
  children: [
    Ember.Object.create({ type: 'text', key: 'first', label: 'First Name' }),
    Ember.Object.create({ type: 'text', key: 'last', label: 'Last Name' })
  ]
});

test('it renders', function(assert) {
  let entry = ArrayEntry.create({ block: authorsSectionBlock });
  this.set('entry', entry);

  this.render(hbs`{{block-section entry=entry}}`);

  assert.equal(jQuery('h2').text().trim(), 'Authors');
  assert.equal(jQuery('label').eq(0).text().trim(), 'First Name');
  assert.equal(jQuery('label').eq(1).text().trim(), 'Last Name');
});

test('it updates the entry value when text is entered', function(assert) {
  let entry = ArrayEntry.create({ block: authorsSectionBlock });
  this.set('entry', entry);

  this.render(hbs`{{block-section entry=entry}}`);

  jQuery('input').eq(0).val('Someone');
  jQuery('input').change();

  jQuery('input').eq(1).val('Author');
  jQuery('input').change();

  assert.deepEqual(entry.flatten(), [{ first: 'Someone', last: 'Author' }]);
});

test('it adds an object to the entry when the "Add" button is clicked', function(assert) {
  let entry = ArrayEntry.create({ block: authorsSectionBlock });
  this.set('entry', entry);

  this.render(hbs`{{block-section entry=entry}}`);

  assert.equal(entry.get('value.length'), 1);

  jQuery('.add button').click();

  assert.equal(entry.get('value.length'), 2);
});
