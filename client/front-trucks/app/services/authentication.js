import Service from '@ember/service';
import Ember from 'ember';
import ENV from '../config/environment';

export default Service.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service(),

  async register( name, password ) {
    console.log(`${ENV.APP.API_HOST}/availableUser`);
    try {
      const user = this.get('store').createRecord('user', { name, password });
      // we make an request to server to know if the user exist
      $.ajax({
        url: `${ENV.APP.API_HOST}/availableUser`,
        type:'POST',
        data: { name, password },
        success: function (data) {
          if(data.result === 'okUserNotExisting')
            user.save();
        }
    });
    } catch (err) {
      console.log(err);
    }
  },

  async authenticate( name, password ) {
    try {
      await this.get('session').authenticate('authenticator:oauth2', name, password );
    } catch (reason) {
      this.set('loginError', reason.error || reason);
    }
  }
});
