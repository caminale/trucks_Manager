import Service from '@ember/service';
import Ember from 'ember';

export default Service.extend({
  store: Ember.inject.service(),

  insertMarkerCity(data) {

    const info = {
        content: data.name,
        visible: false
    };
    const markerMap = {
      name: data.name,
      lat: data.lat,
      lng: data.lng,
      infoWindow: {content: data.name,
        visible: false}
    };
    console.log('le marker est '+JSON.stringify(markerMap));
    const marker = this.get('store').createRecord('marker', { name: "city", marker: markerMap});
    marker.save();
  }
});
