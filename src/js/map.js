ymaps.ready(init);
var myMap;

function init(){
    myMap = new ymaps.Map ("map", {
        center: [51.798387, 39.199451],
        zoom: 17
    });

    myMap.controls.remove('searchControl').remove('trafficControl').remove('geolocationControl');

      myMap.behaviors.disable(['drag', 'scrollZoom']);
    
    myMap.geoObjects
        .add(new ymaps.Placemark([51.798387, 39.199451], {
            balloonContent: '',
            iconCaption: ''
        },{
            preset: 'islands#icon',
            iconColor: '#0095b6'
      }));

}