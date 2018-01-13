import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({
  address: '',
  launchAlgoGenetic: Ember.inject.service(),
  actions: {
    launchAlgo: async function () {
      await this.get('launchAlgoGenetic').launchAlgoGenetic();
    }
  }
});
