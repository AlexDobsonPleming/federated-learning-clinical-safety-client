// components/FederatedModelCard/FederatedModel.ts
export type FederatedModel = {
  id: number;
  name: string | null;
  accuracy: number | null;
  generalisability: number | null;
  privacy: number | null;
};
