import { TrafficLight } from './TrafficLight';

export interface FederatedModelUsabilityTrafficLightProps {
  accuracy: number;
  generalisability: number;
  epsilon: number;
  delta: number;
}

export const FederatedModelUsabilityTrafficLight: React.FC<
  FederatedModelUsabilityTrafficLightProps
> = ({ accuracy, generalisability, epsilon, delta }) => {
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

  if (accuracy < 0.75) {
    escalateStatus('red');
    reasons.push(`Accuracy too low (${accuracy.toFixed(2)} < 0.75)`);
  } else if (accuracy < 0.85) {
    escalateStatus('yellow');
    reasons.push(`Accuracy marginal (${accuracy.toFixed(2)})`);
  }

  if (generalisability > 10) {
    escalateStatus('red');
    reasons.push(`Generalisability too poor (${generalisability.toFixed(1)} pp > 10 pp)`);
  } else if (generalisability > 5) {
    escalateStatus('yellow');
    reasons.push(`Generalisability marginal (${generalisability.toFixed(1)} pp)`);
  }

  if (epsilon > 8) {
    escalateStatus('red');
    reasons.push(`Privacy ε too high (${epsilon.toFixed(2)} > 8)`);
  } else if (epsilon > 1) {
    escalateStatus('yellow');
    reasons.push(`Privacy ε marginal (${epsilon.toFixed(2)})`);
  }

  if (delta > 1e-3) {
    escalateStatus('red');
    reasons.push(`Privacy δ too high (${delta})`);
  } else if (delta > 1e-5) {
    escalateStatus('yellow');
    reasons.push(`Privacy δ marginal (${delta})`);
  }

  const tooltipContent =
    reasons.length > 0 ? (
      <div>
        {reasons.map((r, i) => (
          <div key={i}>{r}</div>
        ))}
      </div>
    ) : (
      'All metrics within safe thresholds'
    );

  return <TrafficLight status={status} tooltip={tooltipContent} />;
};
