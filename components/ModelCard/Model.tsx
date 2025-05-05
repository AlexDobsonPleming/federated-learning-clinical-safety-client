// components/ModelCard/Model.ts
export type Model = {
  id: number;
  name: string;
  accuracy: number;
  generalisability: number;
  security: number | null;
};
