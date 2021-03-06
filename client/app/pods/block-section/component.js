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
import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';
import ObjectEntry from 'therapy-dog/utils/object-entry';

export default Component.extend({
  entryEvents: service('entryEvents'),

  classNames: ['block', 'section'],
  classNameBindings: ['repeat', 'displayed-inline'],
  repeat: alias('entry.block.repeat'),
  "displayed-inline": alias('entry.block.displayInline'),

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.get('entry.block.repeat')) {
      if (!this.get('entry.value')) {
        this.set('entry.value', [this.createBlankEntry()]);
      }
    }
  },

  createBlankEntry() {
    return ObjectEntry.create({
      block: this.get('entry.block')
    });
  },

  actions: {
    add() {
      if (this.get('entry.block.repeat')) {
        let entry = this.createBlankEntry();
        this.get('entry.value').pushObject(entry);

        next(this, function() {
          this.entryEvents.trigger('focus', entry);
        });
      }
    },

    remove(entry) {
      if (this.get('entry.block.repeat')) {
        // Look for an entry to focus after removing this one.
        let entries = this.get('entry.value');
        let index = entries.indexOf(entry);

        // If there is an entry after the one we're removing, focus that.
        // Otherwise, if there is one before, focus that.
        let focusEntry = entries.get(index + 1) || entries.get(index - 1);

        entries.removeObject(entry);

        // If we found an entry to focus, do that.
        // Otherwise, focus the "Add" button.
        if (focusEntry) {
          next(this, function() {
            this.entryEvents.trigger('focus', focusEntry);
          });
        } else {
          next(this, function() {
            this.element.querySelector('.add button').focus();
          });
        }
      }
    }
  }
});
