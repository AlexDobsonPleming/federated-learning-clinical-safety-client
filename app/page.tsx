// app/page.tsx
"use client";

import { ModelGrid } from '../components/ModelGrid/ModelGrid';
import { Model } from '@/components/ModelCard/Model';


const models: Model[] = [
  { id: 1, name: "Model A", accuracy: 0.95, precision: 0.92, crossValidation: 0.93, security: 0.88 },
  { id: 2, name: "Model B", accuracy: 0.90, precision: 0.89, crossValidation: 0.88, security: 0.85 },
  { id: 3, name: "Model C", accuracy: 0.97, precision: 0.94, crossValidation: 0.95, security: 0.90 },
];

export default function HomePage() {
  return <ModelGrid models={models} />;
}
