import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('/');
  this.route('login');
  this.route('register');
  this.route('table-user-page');
  this.route('other');
  this.route('dashboard');
  this.route('table-city-page');
  this.route('table-truck-page');
});

export default Router;
