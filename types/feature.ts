export interface featured {
  type: string;
  features?: FeaturesEntity[] | null;
  attribution: string;
}
export interface FeaturesEntity {
  type: string;
  geometry: Geometry;
  properties: Properties;
}
export interface Geometry {
  coordinates?: number[] | null;
  type: string;
}
export interface Properties {
  name: string;
  mapbox_id: string;
  feature_type: string;
  address: string;
  full_address: string;
  place_formatted: string;
  context: FeatureContext;
  coordinates: Coordinates;
  language: string;
  maki: string;
  poi_category?: string[] | null;
  poi_category_ids?: string[] | null;
  external_ids: FeatureExternalIds;
  metadata: FeatureMetadata;
  operational_status: string;
}
export interface FeatureContext {
  country: FeatureCountry;
  postcode: PostcodeOrPlaceOrStreet;
  place: PostcodeOrPlaceOrStreet;
  address: FeatureAddress;
  street: PostcodeOrPlaceOrStreet;
}
export interface FeatureCountry {
  id: string;
  name: string;
  country_code: string;
  country_code_alpha_3: string;
}
export interface PostcodeOrPlaceOrStreet {
  id: string;
  name: string;
}
export interface FeatureAddress {
  id: string;
  name: string;
  address_number: string;
  street_name: string;
}
export interface Coordinates {
  latitude: number;
  longitude: number;
  routable_points?: RoutablePointsEntity[] | null;
}
export interface RoutablePointsEntity {
  name: string;
  latitude: number;
  longitude: number;
}
export interface FeatureExternalIds {}
export interface FeatureMetadata {
  wheelchair_accessible: boolean;
}
