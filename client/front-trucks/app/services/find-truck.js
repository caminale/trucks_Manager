import Service from '@ember/service';
import ENV from '../config/environment';
import Ember from 'ember';

export default Service.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service(),

  async gettruck( name, user ) {
    console.log(`${ENV.APP.API_HOST}/findTruck`);
    try {
      // we make an request to server to know if the user exist
      const truck = await $.ajax({
        url: `${ENV.APP.API_HOST}/findTruck`,
        type:'POST',
        data: { name, user },
      });
      return truck;
    } catch (err) {
      console.log(err);
    }
  },
});
