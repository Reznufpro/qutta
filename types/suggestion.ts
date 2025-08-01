export interface suggestion {
  suggestions?: SuggestionsEntity[] | null;
  attribution: string;
  response_id: string;
}
export interface SuggestionsEntity {
  name: string;
  mapbox_id: string;
  feature_type: string;
  address: string;
  full_address: string;
  place_formatted: string;
  context: Context;
  language: string;
  maki: string;
  poi_category?: string[] | null;
  poi_category_ids?: string[] | null;
  external_ids: ExternalIds;
  metadata: Metadata;
  distance: number;
}
export interface Context {
  country: Country;
  postcode: PostcodeOrPlace;
  place: PostcodeOrPlace;
  address?: Address | null;
  street: Street;
}
export interface Country {
  name: string;
  country_code: string;
  country_code_alpha_3: string;
}
export interface PostcodeOrPlace {
  id: string;
  name: string;
}
export interface Address {
  name: string;
  address_number: string;
  street_name: string;
}
export interface Street {
  name: string;
}
export interface ExternalIds {
  dataplor: string;
}
export interface Metadata {}
