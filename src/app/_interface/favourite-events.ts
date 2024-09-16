export interface FavouriteEvents {
    id: number | null;
    eventId: number | null;
    title: string | null;
    event_date: string | null;
    time: string | null;
    illustration: string | null;
    favourite: boolean | null;
    active: boolean | null;
    showSuccess?: boolean;
    fadeOut?: boolean;
  }