export interface FavouriteImportant {
    id: number | null;
    importantId: number | null;
    newsId: number | null;
    description: string | null;
    favourite: boolean | null;
    active: boolean | null;
    showSuccess?: boolean;
    fadeOut?: boolean;
  }