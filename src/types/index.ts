export interface Faq {
  id: number;
  question: {
    ru: string;
    kz: string;
    en: string;
    zh: string;
  };
  answer: {
    ru: string;
    kz: string;
    en: string;
    zh: string;
  };
}

export interface News {
  id: string;
  title: { [key: string]: string };
  textContent: { [key: string]: string };
  description: { [key: string]: string };
  remoteFileId: string | null;
  remoteFileContent: string | null;
  cover: string | null;
  gallery: string[];
}

export interface NewsContent {
  ru: string;
  kz: string;
  en: string;
  zh: string;
}
