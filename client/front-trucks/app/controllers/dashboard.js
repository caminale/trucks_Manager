import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  mapMarkers: Ember.computed('model.@each.marker', function() {
    let tab = Ember.A([]);
    this.get('model').content.map((x)=>{
      if(x.__data.marker) {
        let marker = {
          id: x.__data.marker.name,
          lat: x.__data.marker.lat,
          lng: x.__data.marker.lng
        };
        tab.pushObject(marker)
      }
    });
    return tab;
  }),
});
