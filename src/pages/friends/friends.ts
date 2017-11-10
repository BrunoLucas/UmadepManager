import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Fire } from '../../util/fire';
import { MessageMapPage } from '../message-map/message-map';

@Component({
  templateUrl: 'friends.html',
})
export class FriendsPage {

  friends: any = [];

  constructor(private nav: NavController, private fire: Fire
  ) {
    this.initPage();
  }

  private initPage() {
  }

  openMap(friend) {
    this.nav.push(MessageMapPage, { friend });
  }
}
