import Ember from 'ember';
import Columns from '../../mixins/columns-truck';
import layout from '../../templates/components/tables/table-truck';
import { Table } from 'ember-semantic-ui-table';


export default Ember.Component.extend(Columns, {

  layout,
  table: Ember.computed('columns', 'model', function() {
    return new Table(this.get('columns'), this.get('model'));
  })
});
