import Ember from 'ember';

export default Ember.Route.extend({
  deposit: Ember.inject.service(),
  
  model(params) {
    return this.get('deposit').get(params.form_id);
  }
});
