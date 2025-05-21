// components/FederatedModelCard/FederatedModel.ts
export type FederatedModel = {
  id: number;
  name: string;
  accuracy: number;
  generalisability: number;
  security: number | null;
};
