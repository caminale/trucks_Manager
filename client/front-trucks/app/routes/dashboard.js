import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin,{
  searchPosition: Ember.inject.service(),
  session: Ember.inject.service('session'),
  sortProperties: ['name:asc'],
  user: Ember.computed.sort('model.users', 'sortProperties'),
  model() {

    return Ember.RSVP.hash({
      marker: this.store.findAll('marker'),
      truck: this.store.findAll('truck'),
      subStep: this.store.findAll('substep'),
    });

  },

  actions: {

    createUser( name, password ) {
      const user = this.get('store').createRecord('user', { name }, { password });
      user.save();
    },
    async deleteUser( id ) {
      try {
        const user = await this.store.findRecord('user', id ,{ backgroundReload: false });
        user.deleteRecord();
        user.get('isDeleted'); // => true
        user.save(); // => DELETE to /users/1
      } catch ( err ) {
        // Do something to show that something went wrong
      }
    },
    updateUser( id, userName ) {
      this.get('store').findRecord( 'user', id ).then(function ( user ) {
        user.set( 'name', userName );
        user.save();
      })
    },
    searchPos( adress ) {
      this.get( 'searchPosition' ).searchPositionGoogle( adress );
      this.get( 'setupController' );
      },
    logout() {
      this.get( 'session' ).invalidate();
    }
  }
});
