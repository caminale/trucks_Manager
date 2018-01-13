import Route from '@ember/routing/route';
import Ember from 'ember';
import UnauthenticatedRouteMixin from
  'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  authentication: Ember.inject.service('authentication'),
  actions: {
    register( name, password ) {
      this.get('authentication').register( name, password );
    }
  }
});
