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

export default Component.extend({
  tagName: 'input',
  type: 'checkbox',
  attributeBindings: ['checked', 'type', 'value'],

  checked: Ember.computed('value', 'groupValue', function() {
    return this.get('groupValue').includes(this.get('value'));
  }),

  change: function () {
    if (this.element.checked) {
      this.get('groupValue').addObject(this.get('value'));
    } else {
      this.get('groupValue').removeObject(this.get('value'));
    }
  }
});
