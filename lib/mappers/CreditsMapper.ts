import { Credits, ImageCredit, OtherCredit } from '@/lib/dto/CreditsDto';
import { CreditsQueryResult } from '@/sanity.types';

export function mapCreditsFromSanity(data: CreditsQueryResult): Credits {
  return {
    id: data._id,
    pageTitle: data.pageTitle || 'Crédits',
    pageDescription: data.pageDescription || undefined,
    imageCredits: data.imageCredits?.map((credit: any) => ({
      imageName: credit.imageName || '',
      source: credit.source || 'other',
      authorName: credit.authorName || '',
      authorUrl: credit.authorUrl || undefined,
      imageUrl: credit.imageUrl || undefined,
      license: credit.license || undefined,
      usedOn: credit.usedOn || undefined,
    })) || [],
    otherCredits: data.otherCredits?.map((credit: any) => ({
      resourceName: credit.resourceName || '',
      authorName: credit.authorName || '',
      authorUrl: credit.authorUrl || undefined,
      resourceUrl: credit.resourceUrl || undefined,
      license: credit.license || undefined,
      usedOn: credit.usedOn || undefined,
    })) || [],
    footerNote: data.footerNote || undefined,
  };
}
