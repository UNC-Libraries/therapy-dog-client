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
import { render, fillIn, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ValueEntry from 'therapy-dog/utils/value-entry';

module('block-text', 'Integration | Component | Text block', function(hooks) {
  setupRenderingTest(hooks);

  let block = EmberObject.create({
    type: 'text',
    key: 'first-name',
    label: 'First Name',
    required: true
  });

  test('it renders', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-text entry=entry}}`);

    assert.equal(find('label').textContent.trim(), 'First Name');
    assert.ok(find('.block').classList.contains('required'));
  });

  test('it updates the entry value when text is entered', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-text entry=entry}}`);

    await fillIn('input', 'Someone');
    assert.deepEqual(entry.get('value'), 'Someone');
  });

  test('it is invalid with no text entered if required', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-text entry=entry}}`);

    assert.ok(find('.block').classList.contains('invalid'));

    await fillIn('input','Someone');
    assert.notOk(find('.block').classList.contains('invalid'));
  });
});
