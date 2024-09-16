export interface FavouriteNews {
    id: number | null;
    newsId: number | null;
    title: string | null;
    description: string | null;
    illustration: string | null;
    favourite: boolean | null;
    active: boolean | null;
    toggled?: boolean;
    collapsed?: boolean;
    showSuccess?: boolean;
  fadeOut?: boolean;
  }