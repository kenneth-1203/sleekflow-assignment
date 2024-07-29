export interface DataResponse<T> {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: boolean | null;
  };
  results: T[];
}

export interface DataError {
  error: string;
}

export interface Contact {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ContactLocation;
  location: ContactLocation;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface ContactLocation {
  name: string;
  url: string;
}

export interface Location {
  created: Date;
  dimension: string;
  id: number;
  name: string;
  residents: string[];
  type: string;
  url: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: Date;
  episode: string;
  characters: string[];
  url: string;
  created: Date;
}
