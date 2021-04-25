import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

export class locationTask {
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
        console.log(coordinates);
        this.markerCoordinates = coordinates;
        _popup.setLngLat(this.markerCoordinates)
        _popup.addTo(map);
      });
    });

    map.on('load', function () {
      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [[67.00163375959374, 24.860797346189486],
            [67.0015425644873, 24.860142691597318],
            [67.0008344613075, 24.860909294210984],
            [67.00113588378778, 24.863345146576066]
            ]
          }
        }
      });
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': 'green',
          'line-width': 8
        }
      });
    });
  }
}
