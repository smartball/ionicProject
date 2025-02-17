import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile'
import { LoginPage } from '../login/login';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;
  userReady: boolean = false;
  profile = {} as Profile;
  fullName: string;
  profilePicture: string;

  

  constructor(
    public navCtrl: NavController,
    public fb: Facebook, 
    public navParams: NavParams,
    public nativeStorage: NativeStorage) {
  }

  ionViewCanEnter(){
    this.nativeStorage.getItem('user')
    .then((data) => {
      this.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
      this.userReady = true;
    }, (error) => {
      console.log(error);
    });
  }

  doFbLogout(){
    var nav = this.navCtrl;
    this.fb.logout()
    .then((response) => {
      //user logged out so we will remove him from the NativeStorage
      this.nativeStorage.remove('user');
      nav.push(LoginPage);
    }, (error) => {
      console.log(error);
    });
  }
  

}
