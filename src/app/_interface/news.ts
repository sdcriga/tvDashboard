export interface News {
  id: number | null;
  title: string | null;
  description: string | null;
  illustration: string | null;
  favourite: boolean | null;
  active: boolean | null;
  toggled?: boolean;
  collapsed?: boolean;
}
