import loadGoogleMapsApi from 'load-google-maps-api';
import { MarkerData } from '../interfaces/interfaces';
import {
    API_KEY,
    BATTERY_CHARGED_COLOR,
    BATTERY_CHARGED_PERCENT,
    BATTERY_DEFAULT_COLOR,
    BATTERY_UNLOADED_COLOR,
    BATTERY_UNLOADED_PERCENT,
    ICON_PATH,
    LATITUDE_DEFAULT,
    LONGITUDE_DEFAULT,
    ZOOM
} from '../constants/constants';

class Map {
    static loadGoogleMapsApi() {
        return loadGoogleMapsApi({ key: API_KEY });
    }

    static createMap(googleMaps: any, mapElement: HTMLElement) {
        return new googleMaps.Map(mapElement, {
            center: { lat: LATITUDE_DEFAULT, lng: LONGITUDE_DEFAULT },
            zoom: ZOOM
        });
    }

    static setMarker(data: MarkerData) {
        const toggleAnimation = (marker: google.maps.Marker) => {
            setTimeout(() => {
                marker.setAnimation(null);
            }, 2000);
        };
        const setAnimation = (animationName: string) => {
            const animationEntry = Object.entries(google.maps.Animation).filter((animation) => {
                return animation[0] === animationName;
            })[0];
            return animationEntry[1] as number | 0;
        };
        const setPath = (battery: number) => {
            let color = BATTERY_DEFAULT_COLOR;

            if (battery > BATTERY_CHARGED_PERCENT) {
                color = BATTERY_CHARGED_COLOR;
            } else if (battery < BATTERY_UNLOADED_PERCENT) {
                color = BATTERY_UNLOADED_COLOR;
            }
            return ICON_PATH(color);
        };

        const animation = setAnimation(data.animation);
        const marker = new google.maps.Marker({
            position: { lat: data.marker.lat, lng: data.marker.lng },
            map: data.map,
            animation,
            title: data.marker.name,
            icon: { url: setPath(data.marker.battery) }
        });
        marker.setMap(data.map);
        marker.addListener('click', () => {
            data.map.setZoom(ZOOM);
            const position = marker.getPosition();
            position && data.map.setCenter(position);
        });

        if (data.toggleAnimation) {
            toggleAnimation(marker);
        }
        return marker;
    }
}
export default Map;
