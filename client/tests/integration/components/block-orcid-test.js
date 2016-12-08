import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import ValueEntry from 'therapy-dog/utils/value-entry';
import Ember from 'ember';

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

  assert.equal(this.$('label').text().trim(), 'Orcid Id');
  assert.ok(this.$('.block').hasClass('required'));
});

test('it updates the entry value when text is entered', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-orcid entry=entry}}`);

  this.$('input').val('1234-1234-1234-1234');
  this.$('input').change();

  assert.deepEqual(entry.get('value'), '1234-1234-1234-1234');
});

test('it is invalid with no text entered if required', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-orcid entry=entry}}`);

  assert.ok(this.$('.block').hasClass('invalid'));

  this.$('input').val('');
  this.$('input').change();

  assert.ok(this.$('.block').hasClass('invalid'));
});

test('it is invalid if an invalid orcid is entered', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-orcid entry=entry}}`);

  assert.ok(this.$('.block').hasClass('invalid'));

  this.$('input').val('123-1234-1234-1234');
  this.$('input').change();

  assert.ok(this.$('.block').hasClass('invalid'));
});

test('it is valid if an valid orcid is entered', function(assert) {
  let entry = ValueEntry.create({ block });
  this.set('entry', entry);

  this.render(hbs`{{block-orcid entry=entry}}`);

  assert.ok(this.$('.block').hasClass('invalid'));

  this.$('input').val('orcid.org/1234-1234-1234-1234');
  this.$('input').change();

  assert.notOk(this.$('.block').hasClass('invalid'));
});

test('it is valid with no text entered if not required', function(assert) {
  let entry = ValueEntry.create({ optionalBlock });
  this.set('entry', entry);

  this.render(hbs`{{block-orcid entry=entry}}`);

  assert.notOk(this.$('.block').hasClass('invalid'));

  this.$('input').val('');
  this.$('input').change();

  assert.notOk(this.$('.block').hasClass('invalid'));
});
