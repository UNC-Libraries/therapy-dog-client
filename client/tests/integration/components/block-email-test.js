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

module('block-email', 'Integration | Component | Email block', async function(hooks) {
  setupRenderingTest(hooks);

  let block = EmberObject.create({
    type: 'email',
    key: 'email',
    label: 'Email Address',
    required: true
  });

  let optionalBlock = EmberObject.create({
    type: 'email',
    key: 'email',
    label: 'Email Address'
  });

  test('it renders', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-email entry=entry}}`);

    assert.equal(find('label').textContent.trim(), 'Email Address');
    assert.ok(find('.block').classList.contains('required'));
  });

  test('it updates the entry value when text is entered', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-email entry=entry}}`);

    await fillIn('input', 'info@email.edu');
    assert.deepEqual(entry.get('value'), 'info@email.edu');
  });

  test('it is invalid with no text entered if required', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-email entry=entry}}`);

    assert.ok(find('.block').classList.contains('invalid'));

    await fillIn('input', '');
    assert.ok(find('.block').classList.contains('invalid'));
  });

  test('it is invalid if an invalid email is entered', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-email entry=entry}}`);

    assert.ok(find('.block').classList.contains('invalid'));

    await fillIn('input', 'infoemail.edu');
    assert.ok(find('.block').classList.contains('invalid'));
  });

  test('it is valid if an valid email is entered', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-email entry=entry}}`);

    assert.ok(find('.block').classList.contains('invalid'));

    await fillIn('input', 'info@email.edu');
    assert.notOk(find('.block').classList.contains('invalid'));
  });

  test('it is valid with no text entered if not required', async function(assert) {
    let entry = ValueEntry.create({ optionalBlock });
    this.set('entry', entry);

    await render(hbs`{{block-email entry=entry}}`);

    assert.notOk(find('.block').classList.contains('invalid'));

    await fillIn('input', '');
    assert.notOk(find('.block').classList.contains('invalid'));
  });
});
