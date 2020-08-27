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
import { render, find, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ValueEntry from 'therapy-dog/utils/value-entry';
import Ember from 'ember';

module('block-text', 'Integration | Component | Date block with month precision', function (hooks) {
  setupRenderingTest(hooks);

  let block = Ember.Object.create({
    type: 'date',
    key: 'month',
    label: 'Month',
    precision: 'month'
  });

  test('it renders', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-date entry=entry}}`);

    assert.equal(find('legend').textContent.trim(), 'Month');
    assert.equal(find('select.month').value, '');
    assert.equal(find('input.year').value, '');
  });

  test('it sets the value', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-date entry=entry}}`);

    await fillIn('select.month', '01');
    await fillIn('input.year', '2016');
    assert.equal(entry.get('value'), '2016-01');
  });

  test('the value is incomplete and the entry is invalid if only the month is selected', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-date entry=entry}}`);

    await fillIn('select.month', '01');
    assert.equal(entry.get('value'), '-01');
    assert.ok(entry.get('invalid'));
  });

  test('the entry is invalid if only the year is entered', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-date entry=entry}}`);

    await fillIn('input.year', '2016');
    assert.equal(entry.get('value'), '2016-');
    assert.ok(entry.get('invalid'), 'should not be a valid month');
  });

  test('the entry is invalid for invalid input', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-date entry=entry}}`);

    await fillIn('select.month', '01');
    await fillIn('input.year', 'abc');
    assert.equal(entry.get('value'), 'abc-01');
    assert.ok(entry.get('invalid'), 'should not be a valid month');

    await fillIn('input.year', '5');
    assert.equal(entry.get('value'), '5-01');
    assert.ok(entry.get('invalid'), 'should not be a valid month');
  });

  test('the entry is invalid if only the month is unselected after being selected', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-date entry=entry}}`);

    await fillIn('select.month', '01');
    await fillIn('input.year', '2016');
    assert.equal(entry.get('value'), '2016-01');
    assert.notOk(entry.get('invalid'), 'should be a valid month');

    await fillIn('select.month', '');
    assert.equal(entry.get('value'), '2016-');
    assert.ok(entry.get('invalid'), 'should not be a valid month');
  });

  test('the entry is valid if neither the month or year are selected, even after being selected and unselected', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-date entry=entry}}`);

    assert.ok(Ember.isEmpty(entry.get('value')), 'should have an empty value');
    assert.notOk(entry.get('invalid'), 'should not be an invalid month');

    await fillIn('select.month', '01');
    await fillIn('select.month', '');

    await fillIn('input.year', '2016');
    await fillIn('input.year', '');

    assert.ok(Ember.isEmpty(entry.get('value')), 'should have an empty value');
    assert.notOk(entry.get('invalid'), 'should not be an invalid month');
  });
});
