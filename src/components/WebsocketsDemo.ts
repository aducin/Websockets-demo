import { Component, Vue, Watch } from 'vue-property-decorator';
import Map from '../classes/map';
import ScooterList from './List';
import ScooterMap from './Map';
import store from '../store/store';
import WithRender from './websockets-demo.html';
import { Scooter, ScooterMarker, SubscribeMessage } from '../interfaces/interfaces';
import {
    ANIMATION_INIT,
    ANIMATION_UPDATE,
    SCOOTER_GROUP,
    SUBSCRIBE_MESSAGE,
    WS_URI
} from '../constants/constants';

Vue.component('scooter-list', ScooterList);
Vue.component('scooter-map', ScooterMap);

@WithRender
@Component({
    components: { ScooterList, ScooterMap }
})
export default class WebsocketsDemo extends Vue {
    public markers: ScooterMarker[] | [] = [];
    private _scootersMap: google.maps.Map | null = null;
    private _subscribeMessage: SubscribeMessage = SUBSCRIBE_MESSAGE;
    private _websocket: WebSocket | null = null;

    @Watch('list')
    onListChanged() {
        this.handleMarkers();
    }

    get initialised(): boolean {
        return store.getters.initialised;
    }
    get list(): Scooter[] {
        return store.getters.sortedList;
    }

    get scootersMap(): google.maps.Map | null {
        return this._scootersMap;
    }

    set scootersMap(value: google.maps.Map | null) {
        this._scootersMap = value;
    }

    get subscribeMessage(): SubscribeMessage {
        return this._subscribeMessage;
    }

    get websocket(): WebSocket | null {
        return this._websocket;
    }

    set websocket(value: WebSocket | null) {
        this._websocket = value;
    }

    centerMarker = (marker: google.maps.Marker) => {
        if (this.scootersMap) {
            const position = marker.getPosition();
            position && this.scootersMap.setCenter(position);
        }
    }

    handleMarkerClicked = (id: string) => {
        const markerIndex = this.markers.findIndex(el => el.id === id);
        markerIndex !== -1 && this.centerMarker(this.markers[markerIndex].marker);
    }

    handleMarkers = () => {
        if (this.scootersMap) {
            const scootersMap = this.scootersMap;

            // regular update - remove updated items that already exist on the list and add them once again
            if (store.getters.updatedItems.length) {
                this.markers = this.markers.filter(el => {
                    const updatedIndex = store.getters.updatedItems
                        .findIndex((scooter: Scooter) => {
                            return el.id === scooter.id;
                        });
                    updatedIndex !== -1 && el.marker.setMap(null);
                    return updatedIndex === -1;
                });
                this.markers = store.getters.updatedItems
                    .reduce((result: ScooterMarker[], el: Scooter) => {
                        const data = {
                            animation: ANIMATION_UPDATE,
                            map: scootersMap,
                            marker: this.setMarker(el),
                            toggleAnimation: true
                        }
                        return [...result, { id: el.id, marker: Map.setMarker(data)}];
                    }, this.markers);
            } else { // no updated values - initial list dispatch. Set all the items as markers
                this.markers = store.getters.sortedList
                    .map((el: Scooter) => {
                        const data = {
                            animation: ANIMATION_INIT,
                            map: scootersMap,
                            marker: this.setMarker(el),
                            toggleAnimation: false
                        }
                        return { id: el.id, marker: Map.setMarker(data)};
                    });
            }
        }
    }

    onClose = () => {
        this.setConnection();
    }

    onMessage = (evt: MessageEvent) => {
        const eventData = JSON.parse(evt.data);
        const list = eventData.data.filter((scooter: Scooter) => {
            return scooter.group === SCOOTER_GROUP;
        });

        if (!this.initialised) {
            const initialList = list.filter((el: Scooter) => el._change !== 'remove');
            store.dispatch('setInitialData', initialList);
        } else {
            store.dispatch('updateList', list);
        }
    }

    onOpen = () => {
        const parsedData = JSON.stringify(this._subscribeMessage);
        this._websocket && this._websocket.send(parsedData);
    }

    setConnection = () => {
        this.websocket = new WebSocket(WS_URI);
        this.websocket.onclose = () => {
            this.onClose();
        };
        this.websocket.onmessage = (evt: MessageEvent) => {
            this.onMessage(evt)
        };
        this.websocket.onopen = () => {
            this.onOpen();
        };
    }

    setMap = () => {
        const mapElement = document.getElementById('map');

        if (mapElement) {
            Map.loadGoogleMapsApi().then((googleMaps: google.maps.Map) => {
                this.scootersMap = Map.createMap(googleMaps, mapElement);
            });
        }
    }

    setMarker = (el: Scooter) => {
        return {
            battery: el.battery_status.percentage_level,
            lat: el.position.lat,
            lng: el.position.lon,
            name: `${el.name} (battery ${el.battery_status.percentage_level}%)`
        };
    }

    created () {
        this.setConnection();
    }
}
