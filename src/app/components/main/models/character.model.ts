export type Gender = 'femail' | 'genderless' | 'male' | 'unknown';

export type Status = 'alive' | 'dead' | 'unknown';

export interface Info {
  count: number;
  next: null | string;
  pages: number;
  prev: null | string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Character {
  created: string;
  episode: string[];
  gender: Gender;
  id: number;
  image: string;
  location: Location;
  name: string;
  origin: Location;
  species: string;
  status: Status;
  ticketCount: number;
  type: string;
  url: string;
}

export interface CharacterGetResponse {
  info: Info;
  results: Character[];
}
