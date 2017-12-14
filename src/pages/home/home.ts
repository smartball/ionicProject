import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { App, ModalController } from 'ionic-angular';

import { MapDirectionPage } from '../map-direction/map-direction';

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
    public navCtrl: NavController,
    public app: App, 
    public navParams: NavParams,
    private modal: ModalController) {
    this.navCtrl = navCtrl;
  }
  onLoadUser(name: DoubleRange){
    this.navCtrl.push(MapDirectionPage,{userName:name});
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
    

    this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          disableDoubleClickZoom: false,
          disableDefaultUI: true,
          zoomControl: true,
          scaleControl: true,
          center: {lat: 13.75633, lng: 100.50177}
        });
    
    const geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener("click",()=>{
      this.geocodeAddress(geocoder,this.map)
    });
    
  }

  geocodeAddress(geocoder, resultsMap) {
        var getposition_lat;
        var getposition_lng;
        var address = (<HTMLInputElement>document.getElementById('address')).value;
        geocoder.geocode({'address': address}, (results, status) => {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              icon: 'assets/imgs/pin-home.png',
              position: results[0].geometry.location
              
            });
            marker.setMap(this.map);
            getposition_lat = marker.getPosition().lat();
            getposition_lng = marker.getPosition().lng();
            var infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">Test</h1></div>';
            var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent+results[0].formatted_address+'<button id = "myid" style="background-color:red;color:white;width:100%;height:30px;font-size:16px;">Test</button>'
            })

            var sendLatLng = getposition_lat+','+getposition_lng;
            google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
              document.getElementById('myid').addEventListener('click', () => {
                 this.navCtrl.push(MapDirectionPage,{userName:sendLatLng});
              });
            });

            infoWindow.open(this.map, marker);
            
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
            
        });

        // save 
            
           
            

      }
      
      
  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }
  
  
  

}