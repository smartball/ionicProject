import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { App, MenuController, ModalController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

declare var google: any;




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items;
  topics: string[];
  @ViewChild('map') mapRef: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;
  listSearch: string = '';

  map: any;
  marker: any;
  loading: any;
  search: boolean = false;
  error: any;
  switch: string = "map";

  regionals: any = [];
  currentregional: any;
  constructor(
    private afAuth: AngularFireAuth, 
    private toast: ToastController, 
    public navCtrl: NavController,
    public app: App, 
    public navParams: NavParams,
    private modal: ModalController) {

  }

  generateTopics() {
    this.topics = [
      'USA',
      '40.714224,-73.961452',
      '13.720170,100.772072',
      '12.61134,102.1038545999999',
      '15.1851971,100.1251250000000',
      'Procedure to remove back button text',
      'How to reposition ionic tabs on top position.',
      'Override Hardware back button in cordova based application - Ionic',
      'Drupal 8: Enabling Facets for Restful web services',
      'Drupal 8: Get current user session',
      'Drupal 8: Programatically create Add another field - Example',  
    ];
  }
 
  getTopics(ev: any) {
    this.generateTopics();
    let serVal = ev.target.value;
    if (serVal && serVal.trim() != '') {
      this.topics = this.topics.filter((topic) => {
        return (topic.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      })
    }
  }

  openModal(){
    const myModal = this.modal.create('ModalPage');

    myModal.present();
  }

  ionViewDidLoad(){
    this.showMap();
  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }

  showMap(){
    //Location
    

    const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          disableDoubleClickZoom: false,
          disableDefaultUI: true,
          zoomControl: true,
          scaleControl: true,
          center: {lat: 13.75633, lng: 100.50177}
        });

    const geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener("click",()=>{
      this.geocodeAddress(geocoder,map)
    });
    
  }

  geocodeAddress(geocoder, resultsMap) {
        var address = (<HTMLInputElement>document.getElementById('address')).value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }
  
  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data => {
      if(data.email && data.uid){
      this.toast.create({
        message: 'Welcome to APP_NAME, ${data.email}',
        duration: 3000
      }).present();
    }else{
      this.toast.create({
        message: 'Could not find authentication detail',
        duration: 3000
      }).present();
    }
    });

  }
  

}