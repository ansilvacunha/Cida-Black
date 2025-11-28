import { Professional, StylePreset, TimeSlot } from './types';

export const PROFESSIONALS: Professional[] = [
  {
    id: 'cida',
    name: 'Cida',
    specialty: 'ESPECIALISTA EM TRANÇAS E PENTEADOS AFRO',
    image: 'https://picsum.photos/id/64/100/100'
  },
  {
    id: 'andreia',
    name: 'Andreia',
    specialty: 'COLORAÇÃO, CACHOS E TRATAMENTOS',
    image: 'https://picsum.photos/id/65/100/100'
  },
  {
    id: 'andre',
    name: 'André',
    specialty: 'CABELEIREIRO: CORTES MASCULINOS E BARBA',
    image: 'https://picsum.photos/id/91/100/100'
  }
];

export const TIME_SLOTS: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: false },
  { time: '14:00', available: true },
  { time: '15:00', available: false },
  { time: '16:00', available: true },
  { time: '18:00', available: true }
];

export const STYLE_PRESETS: StylePreset[] = [
  { id: 'braids', label: 'Tranças Nagô', prompt: 'hairstyle with intricate Tranças Nagô (Cornrows) patterns' },
  { id: 'afro', label: 'Black Power Volumoso', prompt: 'large, voluminous, well-defined Afro hairstyle' },
  { id: 'dreads', label: 'Dreadlocks Curtos', prompt: 'stylish short dreadlocks with gold accessories' },
  { id: 'boxbraids', label: 'Box Braids Longas', prompt: 'long, flowing Box Braids with color highlights' },
  { id: 'fade', label: 'Corte Geométrico', prompt: 'sharp geometric fade haircut with clean lines' }
];