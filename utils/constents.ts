export interface SurahProps {
  ayahs: ayahProps[];
  englishName?: string;
  englishNameTranslation?: string;
  name: string;
  number: number;
  revelationType?: string;
  numberOfAyahs: number;
}

export interface ayahProps {
  page?: number;
  number?: number;
  text?: string;
  numberInSurah?: number;
}

export interface allAyahProps {
  audio: string;
  audioSecondary: string[];
  number: number;
  numberInSurah: number;
  page: number;
  surah: {
    name: string;
    number: number;
    numberOfAyahs: number;
    revelationType: string;
  };
  text: string;
}

export interface tafsirProps {
  ayah_number?: number;
  tafseer_id?: number;
  tafseer_name?: string;
  text: string;
}

export interface tafsirTypeProps {
  id: number;
  name: string;
}
