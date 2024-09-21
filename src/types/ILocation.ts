export interface ILocation {
  formattedAddress: string;
  latitude: number;
  longitude: number;
  country: string;
  isoCode: string;
  state: string;
  city: string;
  type: 'Point';
  coordinates: [number, number];
}
