
export type AnimationType = 'left' | 'right' | 'center';

export interface CardData {
  id: string;
  type: 'text' | 'image';
  title?: string;
  content?: string;
  imageUrl?: string;
  animationType: AnimationType;
  bgColor: string; // Hex color
  opacity: number; // 0 to 1
  textColor: 'black' | 'white';
}

export interface AppConfig {
  backgroundType: 'color' | 'image';
  backgroundValue: string; // Color hex or Image URL
}
