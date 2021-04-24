import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';


export class locationTask{
  lat: any;
  lng: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  lat = 24.8607;
  lng = 67.0011;
  wasey = true;
  markerCoordinates: locationTask;

  ngOnInit() {
    var _popup = new mapboxgl.Marker(map);
    mapboxgl.accessToken = environment.mapBoxToken;
    var map = new mapboxgl.Map({
      container: 'mapo',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lng, this.lat],
      zoom: 18
    });

    map.on('style.load', function () {
      map.on('click', function (e) {
        var coordinates = e.lngLat;
        this.markerCoordinates = coordinates;
        _popup.setLngLat(this.markerCoordinates)
        _popup.addTo(map);
      });
    });
  }
}
