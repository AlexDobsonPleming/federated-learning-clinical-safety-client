import type { ReactNode } from 'react';
import { TrafficLight } from './TrafficLight';

export interface FederatedModelUsabilityTrafficLightProps {
  accuracy?: number | null;
  generalisability?: number | null;
  epsilon?: number | null;
  delta?: number | null;
}

export function FederatedModelUsabilityTrafficLight(
  props: FederatedModelUsabilityTrafficLightProps
) {
  const { accuracy, generalisability, epsilon, delta } = props;

  type TrafficStatus = 'green' | 'yellow' | 'red';

  let status: TrafficStatus = 'green';
  const reasons: string[] = [];

  const escalateStatus = (newStatus: TrafficStatus) => {
    if (newStatus === 'red') {
      status = 'red';
    } else if (newStatus === 'yellow' && status === 'green') {
      status = 'yellow';
    }
  };

  // --- NULL / UNDEFINED GUARDS ---
  if (accuracy == null) {
    escalateStatus('red');
    reasons.push('Accuracy not provided');
  } else if (accuracy < 0.75) {
    escalateStatus('red');
    reasons.push(`Accuracy too low (${accuracy.toFixed(2)} < 0.75)`);
  } else if (accuracy < 0.85) {
    escalateStatus('yellow');
    reasons.push(`Accuracy marginal (${accuracy.toFixed(2)})`);
  }

  if (generalisability == null) {
    escalateStatus('red');
    reasons.push('Generalisability not provided');
  } else if (generalisability > 10) {
    escalateStatus('red');
    reasons.push(`Generalisability too poor (${generalisability.toFixed(1)} pp > 10 pp)`);
  } else if (generalisability > 5) {
    escalateStatus('yellow');
    reasons.push(`Generalisability marginal (${generalisability.toFixed(1)} pp)`);
  }

  if (epsilon == null) {
    escalateStatus('red');
    reasons.push('Privacy ε not provided');
  } else if (epsilon > 8) {
    escalateStatus('red');
    reasons.push(`Privacy ε too high (${epsilon.toFixed(2)} > 8)`);
  } else if (epsilon > 1) {
    escalateStatus('yellow');
    reasons.push(`Privacy ε marginal (${epsilon.toFixed(2)})`);
  }

  if (delta == null) {
    escalateStatus('red');
    reasons.push('Privacy δ not provided');
  } else if (delta > 1e-3) {
    escalateStatus('red');
    reasons.push(`Privacy δ too high (${delta})`);
  } else if (delta > 1e-5) {
    escalateStatus('yellow');
    reasons.push(`Privacy δ marginal (${delta})`);
  }

  const tooltipContent: ReactNode = (
    reasons.length > 0 ? (
      <div>
        {reasons.map((r, i) => (
          <div key={i}>{r}</div>
        ))}
      </div>
    ) : (
      <>All metrics within safe thresholds</>
    )
  ) as ReactNode;

  return <TrafficLight status={status} tooltip={tooltipContent} />;
}
