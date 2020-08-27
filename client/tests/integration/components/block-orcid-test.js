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

module('block-orcid', 'Integration | Component | Orcid block', function(hooks) {
  setupRenderingTest(hooks);

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

  test('it renders', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-orcid entry=entry}}`);

    assert.equal(find('label').textContent.trim(), 'Orcid Id');
    assert.ok(find('.block').classList.contains('required'));
  });

  test('it updates the entry value when text is entered', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-orcid entry=entry}}`);

    await fillIn('input', '1234-1234-1234-1234');
    assert.deepEqual(entry.get('value'), '1234-1234-1234-1234');
  });

  test('it is invalid with no text entered if required', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-orcid entry=entry}}`);

    assert.ok(find('.block').classList.contains('invalid'));

    await fillIn('input', '');
    assert.ok(find('.block').classList.contains('invalid'));
  });

  test('it is invalid if an invalid orcid is entered', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-orcid entry=entry}}`);

    assert.ok(find('.block').classList.contains('invalid'));

    await fillIn('input', '1234-1234-1234-1234');
    assert.ok(find('.block').classList.contains('invalid'));
  });

  test('it is valid if an valid orcid is entered', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-orcid entry=entry}}`);

    assert.ok(find('.block').classList.contains('invalid'));

    await fillIn('input', 'orcid.org/1234-1234-1234-1234');
    assert.notOk(find('.block').classList.contains('invalid'));
  });

  test('it is valid with no text entered if not required', async function(assert) {
    let entry = ValueEntry.create({ optionalBlock });
    this.set('entry', entry);

    await render(hbs`{{block-orcid entry=entry}}`);

    assert.notOk(find('.block').classList.contains('invalid'));

    await  fillIn('input', '');
    assert.notOk(find('.block').classList.contains('invalid'));
  });
});
