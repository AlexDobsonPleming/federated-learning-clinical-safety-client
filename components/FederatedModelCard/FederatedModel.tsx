// components/FederatedModelCard/FederatedModel.ts
export type FederatedModel = {
  id: number;
  name: string;
  time_produced: number;
  accuracy: number | null;
  generalisability: number | null;
  privacy: number | null; //epsilon
  leakage_chance: number | null; //delta
};
