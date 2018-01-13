import Component from '@ember/component';

export default Component.extend({
  name: '',
  password: '',

  actions: {
    register(){
      this.sendAction('register', this.get('name'),this.get('password'));
    }
  }
});
