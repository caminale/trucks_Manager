import DS from 'ember-data';

export default DS.Model.extend({
  typeMarker: DS.attr('string'),
  marker: DS.attr()
});
