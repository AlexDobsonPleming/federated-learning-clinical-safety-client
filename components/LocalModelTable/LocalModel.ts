// components/LocalModelTable/LocalModel.ts
export interface LocalModel {
  id: number;
  name: string | null;
  privacy: number | null;
  leakage_chance: number | null;
  noise: number | null;
}
