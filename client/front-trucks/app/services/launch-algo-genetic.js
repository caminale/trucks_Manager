import Service from '@ember/service';
import Ember from 'ember';
import ENV from '../config/environment';

export default Service.extend({
  store: Ember.inject.service(),

  async launchAlgoGenetic() {
    try {
      // we make an request to server to know if the user exist
      $.ajax({
        url: `${ENV.APP.API_HOST}/ia`,
        type:'POST',
      });
    } catch (err) {
      console.log(err);
    }
  }
});
