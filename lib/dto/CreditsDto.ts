export interface ImageCredit {
  imageName: string;
  source: 'unsplash' | 'pexels' | 'pixabay' | 'freepik' | 'other';
  authorName: string;
  authorUrl?: string;
  imageUrl?: string;
  license?: string;
  usedOn?: string;
}

export interface OtherCredit {
  resourceName: string;
  authorName: string;
  authorUrl?: string;
  resourceUrl?: string;
  license?: string;
  usedOn?: string;
}

export interface Credits {
  id: string;
  pageTitle: string;
  pageDescription?: string;
  imageCredits: ImageCredit[];
  otherCredits: OtherCredit[];
  footerNote?: string;
}
