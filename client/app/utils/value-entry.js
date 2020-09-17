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
import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const DATE_DAY_REGEXP = /^[1-2]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/;
const DATE_MONTH_REGEXP = /^[1-2]\d{3}-(0[1-9]|1[0-2])$/;
const DATE_YEAR_REGEXP = /^[1-2]\d{3}$/;
const DATE_ADMIN_REGEXP = /^([1-2]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])|[1-2]\d{3}-(0[1-9]|1[0-2])|^[1-2]\d{3}$)$/;
const DURATION_REGEXP = /^P.+$/;
const ORCID_REGEXP = /^((https?:\/\/)?orcid\.org\/)?\d{4}-\d{4}-\d{4}-\d{4}$/;

export default EmberObject.extend({
  required: computed('block.type', 'block.required', function() {
    let type = this.get('block.type');
    let required = this.get('block.required');

    if (type === 'agreement') {
      return true;
    } else if (required) {
      return true;
    } else {
      return false;
    }
  }),

  invalid: computed('errors', function() {
    return !isEmpty(this.errors);
  }),

  errors: computed('block.{name,precision,required,type}', 'value.[]', function() {
    let type = this.get('block.type');
    let required = this.get('block.required');
    let value = this.value;

    if (type === 'agreement' && !value) {
      return [`You must agree to the ${this.get('block.name')} before depositing.`];
    } else if (type === 'file' && required && isEmpty(value)) {
      return [`This file is required.`];
    } else if (type === 'checkboxes' && required && isEmpty(value)) {
      return [`Please check at least one option.`];
    } else if (required && isEmpty(value)) {
      return [`This field is required.`];
    } else if (type === 'email' && !isEmpty(value) && !EMAIL_REGEXP.test(value)) {
      return [`The entered value is not a valid email address.`];
    } else if (type === 'orcid' && !isEmpty(value) && !ORCID_REGEXP.test(value)) {
      return [`The entered value is not a valid orcid id.`];
    } else if (type === 'date') {
      let precision = this.get('block.precision');

      // Duration date valid according to pattern
      if (DURATION_REGEXP.test(value)) {
        return [];
      }

      // A date is invalid if it is not blank and does not match the pattern corresponding to the block's precision property.
      if (precision === 'admin' && !isEmpty(value) && !DATE_ADMIN_REGEXP.test(value)) {
        return [`Please enter a valid date (YYYY or YYYY-MM or YYYY-MM-DD).`];
      } else if (precision === 'year' && !isEmpty(value) && !DATE_YEAR_REGEXP.test(value)) {
        return [`Please enter a valid year.`];
      } else if (precision === 'month' && !isEmpty(value) && !DATE_MONTH_REGEXP.test(value)) {
        return [`Please enter a valid month and year.`];
      } else if ((precision === 'day' || isEmpty(precision)) && !isEmpty(value) && !DATE_DAY_REGEXP.test(value)) {
        return [`Please enter a valid date.`];
      }
    } else {
      return [];
    }
  }),

  flatten() {
    return this.value;
  },

  forEach(iterator) {
    iterator(this);
  }
});
