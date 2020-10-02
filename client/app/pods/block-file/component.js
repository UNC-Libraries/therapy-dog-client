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
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { next, scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import FocusEntryAction from 'therapy-dog/mixins/focus-entry-action';

export default Component.extend(FocusEntryAction, {
  init() {
    this._super(...arguments);
    this.set('uploads', []);
  },

  classNames: ['block', 'file'],
  classNameBindings: ['required', 'invalid', 'isMultiple:multiple'],
  required: alias('entry.required'),
  invalid: alias('entry.invalid'),
  isMultiple: alias('entry.block.multiple'),

  uploader: service('uploader'),

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.get('entry.block.multiple')) {
      if (!this.get('entry.value')) {
        this.set('entry.value', []);
      }
    }
  },

  /**
   * * NOT USED IN ADMIN APP VERSION OF FORMS
   *
   * Leaving here in case standalone forms app is needed again
   * It works, but causes a ESLint linting error as currently setup
   *
   * Adds referrer link to "contact us" link in the footer.
   * It's added here because it's the only form element that's in every form.
   * Otherwise we'd need to add a property to every form.
   *
  addFooter: function() {
    let url = location.href;
    // Remove any parameters or hash tags
    let shortenedUrl = encodeURIComponent(url.split(/\?|#/)[0]);
    let link = document.getElementById('referrer');
    link.href = 'https://library.unc.edu/wilson/contact/?refer=' + shortenedUrl;
  }.on('didInsertElement'),  */

  acceptsNewUpload: computed('uploads.length', 'isMultiple', function() {
    let count = this.get('uploads.length'), multiple = this.isMultiple;

    if (!multiple && count > 0) {
      return false;
    } else {
      return true;
    }
  }),

  uploadFile: function(file) {
    let upload = this.uploader.upload(file);

    upload.on('complete', (response) => {
      if (this.isMultiple) {
        this.get('entry.value').pushObject(response.id);
      } else {
        this.set('entry.value', response.id);
      }

      if (!this.isMultiple) {
        scheduleOnce('afterRender', this, function() {
          let inputBox = this.element.querySelector('input');
          if (inputBox !== null)  {
            inputBox.focus();
          }
        });
      }
    });

    upload.on('error', () => {
      if (!this.isMultiple) {
        scheduleOnce('afterRender', this, function() {
          let inputBox = this.element.querySelector('input');
          if (inputBox !== null)  {
            inputBox.focus();
          }
        });
      }
    });

    this.uploads.pushObject(upload);

    if (!this.isMultiple) {
      scheduleOnce('afterRender', this, function() {
        let inputBox = this.element.querySelector('input');
        if (inputBox !== null)  {
          inputBox.focus();
        }
      });
    }
  },

  removeUpload(upload) {
    let uploads = this.uploads;
    let removedIndex = uploads.indexOf(upload);
    uploads.removeObject(upload);

    if (!this.isMultiple) {
      scheduleOnce('afterRender', this, function() {
        this.element.querySelector('input[type="file"]').focus();
      });
    } else {
      let focusIndex = -1;

      if (removedIndex - 1 >= 0) {
        focusIndex = removedIndex - 1;
      } else if (removedIndex < uploads.length) {
        focusIndex = removedIndex;
      }

      next(this, function() {
        if (focusIndex === -1) {
          let inputBox = this.element.querySelector('input');
          if (inputBox !== null)  {
            inputBox.focus();
          }
        } else {
          jQuery('.upload', this.element).eq(focusIndex).find('button, input').eq(0).focus();
        }
      });
    }
  },

  actions: {
    choose: function(fileList) {
      if (fileList.length > 0) {
        if (this.isMultiple) {
          for (let i = 0; i < fileList.length; i++) {
            this.uploadFile(fileList[i]);
          }
        } else {
          this.uploads.clear();
          this.uploadFile(fileList[0]);
        }
      }
    },

    cancel(upload) {
      upload.cancel();
      this.removeUpload(upload);
    },

    retry(upload) {
      upload.retry();
    },

    remove(upload) {
      if (this.isMultiple) {
        this.entry.value.removeObject(upload.response.id);
      } else {
        this.set('entry.value', null);
      }

      this.removeUpload(upload);
    },

    focusEntry() {
      let inputBox = this.element.querySelector('input');
      if (inputBox !== null)  {
        inputBox.focus();
      }
    },

    focusInput() {
      this.element.querySelectorAll('.choose-file-wrapper').forEach((el) => {
        el.classList.add('file-input-focus');
      });
    },

    blurInput() {
      this.element.querySelectorAll('.choose-file-wrapper').forEach((el) => {
        el.classList.add('file-input-focus');
      });
    }
  }
});
