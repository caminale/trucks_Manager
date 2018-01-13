import Component from '@ember/component';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Component.extend({
  session:     service('session'),
  namecreate: '',
  namedelete: '',
  oldname: '',
  newname: '',
  typeobject: '',
  actions: {
    update(){
      this.sendAction('update',
        this.get('oldname'),
        this.get('newname'),
        this.get('typeobject'),
        this.get('session.data.authenticated.user_id'));
    },
    delete(){
      this.sendAction('delete',
        this.get('namedelete'),
        this.get('typeobject'),
        this.get('session.data.authenticated.user_id'));
    },
    create(){
      this.sendAction('create',
        this.get('namecreate'),
        this.get('typeobject'),
        this.get('session.data.authenticated.user_id'));
    }
  }
});
