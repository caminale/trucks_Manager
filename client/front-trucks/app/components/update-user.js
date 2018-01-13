import Component from '@ember/component';

export default Component.extend({

  id: '',
  userName: '',
  actions: {
    updateUser(){
      this.sendAction('action', this.get('id'),this.get('userName'));
    }
  }
});
