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
import Ember from 'ember';
import Component from '@ember/component';
import FocusEntryAction from 'therapy-dog/mixins/focus-entry-action';

export default Component.extend(FocusEntryAction, {
  classNames: ['block', 'radio'],
  classNameBindings: ['required', 'invalid'],
  required: Ember.computed.alias('entry.required'),
  invalid: Ember.computed.alias('entry.invalid'),

  didReceiveAttrs() {
    this._super(...arguments);

    if (Ember.isBlank(this.get('entry.value'))) {
      let firstOption = this.get('entry.block.options')[0];
      let firstValue = firstOption.value ? firstOption.value : firstOption;

      this.set('entry.value', this.get('entry.block.defaultValue') || firstValue);
    }
  },

  actions: {
    clear: function() {
      this.set('entry.value', '');
    },

    focusEntry: function() {
      let inputs = this.element.querySelectorAll('input');
      inputs[0].focus();
    }
  }
});
