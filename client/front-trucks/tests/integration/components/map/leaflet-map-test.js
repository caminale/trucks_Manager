import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('map/leaflet-map', 'Integration | Component | map/leaflet map', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{map/leaflet-map}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#map/leaflet-map}}
      template block text
    {{/map/leaflet-map}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
