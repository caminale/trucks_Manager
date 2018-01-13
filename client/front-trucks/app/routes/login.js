import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin
  from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin,{
  authentication: Ember.inject.service('authentication'),
  actions: {
    login( name, password ) {
      this.get('authentication').authenticate( name, password );
    }
  }
});
