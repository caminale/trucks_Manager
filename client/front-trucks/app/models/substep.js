import DS from 'ember-data';

export default DS.Model.extend({
  departure: DS.attr('String'),
  arrival: DS.attr('String'),
  steps: DS.attr()
});
