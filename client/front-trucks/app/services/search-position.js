import Service from '@ember/service';
import Ember from 'ember';
import ENV from '../config/environment';

export default Service.extend({
  store: Ember.inject.service(),
  ajax: Ember.inject.service(),
  insertMarker: Ember.inject.service(),

  async createCity( data, address ) {
    const ressources = 200;
    let lat = data.results[0].geometry.location.lat;
    let lng = data.results[0].geometry.location.lng;
    let position = {
      latitude: lat,
      longitude: lng
    };
    const marker = {
      lat: lat,
      lng: lng,
      name: address,
      typeMarker: "city"
    };
    console.log('le marker dans search pos est : '+JSON.stringify(marker));
    const city = this.get('store').createRecord('city', { name: address, ressources, position});
    city.save();
    this.get( 'insertMarker' ).insertMarkerCity( marker );
  },
  async request( address ) {
    let data = $.ajax({
      url: `${ENV.googleAPI.urlRequest}${address}+CA&key=${ENV.googleAPI.apiKey}`,
      type:'GET'});
    return data;
  },
  async searchPositionGoogle( address ) {
    try {
      // we make an request to google api
      const data = await this.request ( address );
      await this.createCity ( data, address );

    } catch ( err ) {
      console.log( err );
    }
  },
});
