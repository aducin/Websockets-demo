import { SubscribeMessage } from '../interfaces/interfaces';

export const ANIMATION_INIT = 'DROP';
export const ANIMATION_UPDATE = 'BOUNCE';
export const API_KEY = 'REAL_KEY';
export const BATTERY_CHARGED_COLOR = 'green';
export const BATTERY_CHARGED_PERCENT = 50;
export const BATTERY_DEFAULT_COLOR = 'yellow';
export const BATTERY_UNLOADED_COLOR = 'red';
export const BATTERY_UNLOADED_PERCENT = 30;
export const ICON_PATH = (color: string) => `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
export const LATITUDE_DEFAULT = 52.237049;
export const LONGITUDE_DEFAULT = 21.017532;
export const SCOOTER_GROUP = 'warsaw';
export const SUBSCRIBE_MESSAGE: SubscribeMessage = {name: "vehicle/view/rentable/subscribe"};
export const WS_URI = "REAL_WS_ADDRESS";
export const ZOOM = 12;
