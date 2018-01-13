import Ember from 'ember';

export default Ember.Mixin.create({
  columns: Ember.computed(function() {
    return [
      {
        cellType: 'row-number',
        verticalAlign: 'middle'
      },
      {
        label: 'name',
        valuePath: 'name',
        verticalAlign: 'middle'
      },
      // {
      //   label: 'User',
      //   valuePath: 'user.name',
      //   verticalAlign: 'middle'
      // },
      {
        label: 'Delivering',
        valuePath: 'delivering',
        verticalAlign: 'middle'
      },
    ];
  })
});
