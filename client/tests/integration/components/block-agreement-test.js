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
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ValueEntry from 'therapy-dog/utils/value-entry';
import Ember from 'ember';

module('block-agreement', 'Integration | Component | Agreement block', function (hooks) {
  setupRenderingTest(hooks);

  let block = Ember.Object.create({
    type: 'agreement',
    key: 'agreement',
    name: 'Deposit Agreement',
    uri: 'http://example.com/agreement',
    prompt: 'I agree to the <a href="http://example.com/agreement">agreement</a>.'
  });

  test('it renders', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-agreement entry=entry}}`);

    assert.equal(find('h2').textContent.trim(), 'Deposit Agreement');
    assert.equal(find('label').textContent.trim(), 'I agree to the agreement.');
    assert.ok(find('.block').classList.contains('required'));
  });

  test('it updates the entry value when clicked', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-agreement entry=entry}}`);

    assert.deepEqual(entry.get('value'), false);

    await click('input:first-of-type');
    assert.deepEqual(entry.get('value'), true);

    await click('input:last-of-type');
    assert.deepEqual(entry.get('value'), false);
  });

  test('it is invalid unless checked', async function(assert) {
    let entry = ValueEntry.create({ block });
    this.set('entry', entry);

    await render(hbs`{{block-agreement entry=entry}}`);

    let selectedBlock = find('.block');
    assert.ok(selectedBlock.classList.contains('invalid'));

    await click('input:first-of-type');
    assert.notOk(selectedBlock.classList.contains('invalid'));

    await click('input:last-of-type');
    assert.ok(selectedBlock.classList.contains('invalid'));
  });
});


