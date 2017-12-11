import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { CloudModule, CloudSettings} from '@ionic/cloud-angular';
import { NativeStorage } from '@ionic-native/native-storage';



import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { UserPage } from '../pages/user/user';
import { ProfilePage } from '../pages/profile/profile';
import { MapDirectionPage } from '../pages/map-direction/map-direction';
import { GooglePlus } from '@ionic-native/google-plus';

import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { GeocoderProvider } from '../providers/geocoder/geocoder';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'd1117846'
  },
  'auth': {
    'facebook': {
      'scope': []
    }
  }
}

firebase.initializeApp({
  apiKey: "AIzaSyAaAaPHyw8bP3f-r82-ZPZwPSzLqv_mP2s",
    authDomain: "hasauth-b69e3.firebaseapp.com",
    databaseURL: "https://hasauth-b69e3.firebaseio.com",
    projectId: "hasauth-b69e3",
    storageBucket: "hasauth-b69e3.appspot.com",
    messagingSenderId: "291100550318"
})
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    ProfilePage,
    UserPage,
    MapDirectionPage
   

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    ProfilePage,
    UserPage,
    MapDirectionPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    NativeStorage,
    GooglePlus,
    GeocoderProvider
  ]
})
export class AppModule {}
