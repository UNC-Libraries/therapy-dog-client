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
import { render, find, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ValueEntry from 'therapy-dog/utils/value-entry';
import Ember from 'ember';

module('block-radio', 'Integration | Component | Radio block', function(hooks) {
  setupRenderingTest(hooks);

  let vocabRadioBlock = Ember.Object.create({
    type: 'radio',
    key: 'colors',
    label: 'Primary Colors',
    options: [
      { label: 'Red', value: '#f00' },
      { label: 'Blue', value: '#0f0' },
      { label: 'Yellow', value: '#ff0' }
    ]
  });

  let defaultValueRadioBlock = Ember.Object.create({
    type: 'radio',
    key: 'colors',
    label: 'Primary Colors',
    options: [
      { label: 'Red', value: '#f00' },
      { label: 'Blue', value: '#0f0' },
      { label: 'Yellow', value: '#ff0' }
    ],
    defaultValue: '#0f0'
  });

  test('it renders', async function(assert) {
    let entry = ValueEntry.create({ block: vocabRadioBlock });
    this.set('entry', entry);

    await render(hbs`{{block-radio entry=entry}}`);

    assert.equal(find('h2').textContent.trim(), 'Primary Colors');
    assert.deepEqual(findAll('label').map((e) => e.textContent.trim()), ['Red', 'Blue', 'Yellow']);
  });

  test('it sets the initial value to the first option', async function(assert) {
    let entry = ValueEntry.create({ block: vocabRadioBlock });
    this.set('entry', entry);

    await render(hbs`{{block-radio entry=entry}}`);

    let inputs = findAll('input');

    assert.ok(inputs.get(0).checked);
    assert.deepEqual(entry.get('value'), '#f00');
  });

  test('it updates the entry value with the "value" property in options when clicked', async function(assert) {
    let entry = ValueEntry.create({ block: vocabRadioBlock });
    this.set('entry', entry);

    await render(hbs`{{block-radio entry=entry}}`);

    let inputs = findAll('input');

    await click(inputs.get(0));
    assert.deepEqual(entry.get('value'), '#f00');

    await click(inputs.get(1));
    assert.deepEqual(entry.get('value'), '#0f0');
  });

  test('it sets the initial value to defaultValue if present', async function(assert) {
    let entry = ValueEntry.create({ block: defaultValueRadioBlock });
    this.set('entry', entry);

    await render(hbs`{{block-radio entry=entry}}`);

    let inputs = findAll('input');

    assert.ok(inputs.get(1).checked);
    assert.deepEqual(entry.get('value'), '#0f0');
  });
});
