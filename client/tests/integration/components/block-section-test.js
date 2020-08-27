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
import { render, find, findAll, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ArrayEntry from 'therapy-dog/utils/array-entry';
import Ember from 'ember';

module('block-section', 'Integration | Component | Section block', function(hooks) {
  setupRenderingTest(hooks);

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

  test('it renders', async function(assert) {
    let entry = ArrayEntry.create({ block: authorsSectionBlock });
    this.set('entry', entry);

    await render(hbs`{{block-section entry=entry}}`);

    assert.equal(find('h2').textContent.trim(), 'Authors');

    let labels = findAll('label');

    assert.equal(labels.get(0).textContent.trim(), 'First Name');
    assert.equal(labels.get(1).textContent.trim(), 'Last Name');
  });

  test('it updates the entry value when text is entered', async function(assert) {
    let entry = ArrayEntry.create({ block: authorsSectionBlock });
    this.set('entry', entry);

    await render(hbs`{{block-section entry=entry}}`);

    let inputs = findAll('input');

    await fillIn(inputs.get(0), 'Someone');
    await fillIn(inputs.get(1), 'Author');

    assert.deepEqual(entry.flatten(), [{ first: 'Someone', last: 'Author' }]);
  });

  test('it adds an object to the entry when the "Add" button is clicked', async function(assert) {
    let entry = ArrayEntry.create({ block: authorsSectionBlock });
    this.set('entry', entry);

    await render(hbs`{{block-section entry=entry}}`);

    assert.equal(entry.get('value.length'), 1);

    await click('.add button');

    assert.equal(entry.get('value.length'), 2);
  });
});
