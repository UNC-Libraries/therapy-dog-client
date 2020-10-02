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
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import { render, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ValueEntry from 'therapy-dog/utils/value-entry';

module('block-text', 'Integration | Component | Date block with year precision', async function(hooks) {
  setupRenderingTest(hooks);

  let block = EmberObject.create({
    type: 'date',
    key: 'year',
    label: 'Year',
    precision: 'year'
  });

  test('it renders', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-date entry=entry}}`);

    assert.equal(find('label').textContent.trim(), 'Year');
    assert.equal(find('input').value, '');
  });

  test('it sets the value', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-date entry=entry}}`);

    await fillIn('input', '2016');
    assert.equal(entry.get('value'), '2016');
  });

  test('the entry is valid if blank', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-date entry=entry}}`);

    await fillIn('input', '');
    assert.equal(entry.get('value'), '');
    assert.notOk(entry.get('invalid'), 'should be a valid year');
  });

  test('the entry is invalid for invalid input', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-date entry=entry}}`);

    await fillIn('input', 'abc');
    assert.equal(entry.get('value'), 'abc');
    assert.ok(entry.get('invalid'), 'should not be a valid year');

    await fillIn('input', '5');
    assert.equal(entry.get('value'), '5');
    assert.ok(entry.get('invalid'), 'should not be a valid year');
  });
});


