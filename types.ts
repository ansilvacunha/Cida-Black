export type ViewState = 'home' | 'styler' | 'booking';

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface StylePreset {
  id: string;
  label: string;
  prompt: string;
}