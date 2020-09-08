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
import { computed } from '@ember/object';
import { isEmpty, typeOf } from '@ember/utils';

export default Component.extend({
  classNames: ['month-input'],
  monthList: [
    {key:'', value: ''},
    {key:'01', value: 'January'},
    {key:'02', value: 'February'},
    {key:'03', value: 'March'},
    {key:'04', value: 'April'},
    {key:'05', value: 'May'},
    {key:'06', value: 'June'},
    {key:'07', value: 'July'},
    {key:'08', value: 'August'},
    {key:'09', value: 'September'},
    {key:'10', value: 'October'},
    {key:'11', value: 'November'},
    {key:'12', value: 'December'}
  ],

  value: computed('year', 'month', {
    get() {
      let { year, month } =  { year: this.year, month: this.month };

      if (isEmpty(year) && isEmpty(month)) {
        return '';
      } else {
        return (year || '') + '-' + (month || '');
      }
    },

    set(key, value) {
      if (typeOf(value) === 'string') {
        let [year, month] = value.split('-');
        this.set('year', year || '');
        this.set('month', month || '');
      } else {
        this.set('year', '');
        this.set('month', '');
      }
    }
  }),

  actions: {
    setMonth: function(month) {
      this.set('month', month);
    },
    setYear: function(year) {
      this.set('year', year);
    }
  }
});
