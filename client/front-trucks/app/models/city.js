import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  ressources: DS.attr('number'),
  position: DS.attr()

});
