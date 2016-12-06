import Ember from 'ember';
import FocusEntryAction from 'therapy-dog/mixins/focus-entry-action';

export default Ember.Component.extend(FocusEntryAction, {
  classNames: ['block', 'orcid'],
  classNameBindings: ['required', 'invalid'],
  required: Ember.computed.alias('entry.required'),
  invalid: Ember.computed.alias('entry.invalid'),

  didReceiveAttrs() {
    this._super(...arguments);

    let receivedOrcidValue = this.get('entry.value');

    if (Ember.isBlank(receivedOrcidValue)) {
      this.set('entry.value', this.get('entry.block.defaultValue') || '');
    } else {
      let protocolRegex = /^https?:\/\//;

      if (!protocolRegex.test(receivedOrcidValue)) {
        let urlPrefix = receivedOrcidValue.match(protocolRegex);
        let isSslRegex = /s/;
        let formattedOrcidValue;

        if(urlPrefix === null) {
          formattedOrcidValue = `http://${receivedOrcidValue}`;
        } else {
          formattedOrcidValue = (isSslRegex.test(urlPrefix[0])) ? urlPrefix[0].replace(isSslRegex, '') : receivedOrcidValue;
        }

        this.set('entry.value',  formattedOrcidValue);
      }
    }
  },

  didInsertElement: function() {
    this._super(...arguments);

    let options = this.get('entry.block.options');
    if (Ember.isArray(options)) {
      this.$('.autocomplete').autocomplete({
        source: options
      });
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    let options = this.get('entry.block.options');
    if (Ember.isArray(options)) {
      this.$('.autocomplete').autocomplete('destroy');
    }
  },

  actions: {
    focusEntry: function() {
      this.$('input').focus();
    }
  }
});