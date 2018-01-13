import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('String'),
  user: DS.belongsTo('user'),
  delivering: DS.attr('Boolean')

});
