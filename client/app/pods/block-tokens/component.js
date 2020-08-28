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
import jQuery from 'jquery';
import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
import { scheduleOnce } from '@ember/runloop';
import { isBlank } from '@ember/utils';
import FocusEntryAction from 'therapy-dog/mixins/focus-entry-action';

export default Component.extend(FocusEntryAction, {
  classNames: ['block', 'tokens'],
  classNameBindings: ['required', 'invalid'],
  required: alias('entry.required'),
  invalid: alias('entry.invalid'),

  didReceiveAttrs() {
    this._super(...arguments);

    if (isBlank(this.get('entry.value'))) {
      this.set('entry.value', []);
    }
  },

  didInsertElement: function() {
    this._super(...arguments);
    let el = this.element;

    jQuery('ul.tagit', el).tagit({
      placeholderText: this.get('entry.block.placeholder'),
      allowDuplicates: true,
      removeConfirmation: true,
      allowSpaces: true,
      availableTags: this.get('entry.block.options'),
      afterTagAdded: () => {
        scheduleOnce('afterRender', this, function() {
          this.set('entry.value', jQuery('ul.tagit', el).tagit('assignedTags'));
        });
      },
      afterTagRemoved: () => {
        scheduleOnce('afterRender', this, function() {
          this.set('entry.value', jQuery('ul.tagit', el).tagit('assignedTags'));
        });
      }
    });

    let tagitInput = jQuery('ul.tagit input', this.element);

    tagitInput.attr('id', guidFor(this.get('entry')));

    tagitInput.on('focus', () => {
      this.element.querySelectorAll('ul.tagit').forEach((el) => {
        el.classList.add('tagit-focus');
      });
    });

    tagitInput.on('blur', () => {
      this.element.querySelectorAll('ul.tagit').forEach((el) => {
        el.classList.remove('tagit-focus');
      });
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    jQuery('ul.tagit').tagit('destroy');
    let tagInput = jQuery('ul.tagit input');
    tagInput.off('focus');
    tagInput.off('blur');
  },

  actions: {
    focusEntry: function() {
      this.element.querySelector('input').focus();
    }
  }
});
