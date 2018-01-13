import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin,{

  model() {
    return Ember.RSVP.hash({
      users: this.get('store').findAll('user'),
    });
  },
  actions: {
    createUser(name,password) {
      const user = this.get('store').createRecord('user', { name }, { password });
      user.save();
    }
  }
});
