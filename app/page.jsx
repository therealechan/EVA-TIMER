import { Suspense } from 'react';
import Timer from './components/Timer';

export default function HomePage() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Timer />
    </Suspense>
  );
} 