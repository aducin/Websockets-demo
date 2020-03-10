interface BatteryStatus {
    percentage_level: number;
    estimated_distance: number;
    battery_matched: boolean;
    time: number;
}

export interface MarkerData {
    animation: string;
    marker: PositionGoogleMap;
    map: google.maps.Map;
    toggleAnimation: boolean;
}

interface Position {
    lat: number;
    lon: number;
}

export interface PositionGoogleMap {
    battery: number;
    lat: number;
    lng: number;
    name: string;
}

export interface Scooter {
    id: string;
    name: string;
    plate: string;
    position: Position;
    battery_status: BatteryStatus;
    scooter_version: string;
    group: string;
    _change: "add" | "remove" | "update";
}

export interface ScooterMarker {
    id: string;
    marker: google.maps.Marker;
}

export interface SubscribeMessage {
    name: string;
}
