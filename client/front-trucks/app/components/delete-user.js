
import Component from '@ember/component';

export default Component.extend({
  id: '',
  actions: {
    deleteUser(){
      this.sendAction('action', this.get('id'));
    }
  }
});
