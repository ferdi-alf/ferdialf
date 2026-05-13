export interface JourneyEvent {
  id?: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  color?: string;
}

export interface Journey {
  events: JourneyEvent[];
}
