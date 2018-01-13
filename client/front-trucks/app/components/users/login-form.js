import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  session: Ember.inject.service('session'),
  name: '',
  password: '',
  actions: {
    login(){
      this.sendAction('login', this.get('name'),this.get('password'));
    }
  }
});
