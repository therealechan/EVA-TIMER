import { Suspense } from 'react';
import Timer from './components/Timer';

export const metadata = {
  title: 'EVA POMODORO | Evangelion-inspired Productivity Timer',
  description: 'Boost your productivity with this Evangelion-inspired Pomodoro timer featuring glitch effects and customizable time settings.',
};

export default function HomePage() {
  return (
    <main className="content-wrapper">
      <h1 className="visually-hidden">EVA POMODORO - Evangelion-inspired Productivity Timer</h1>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Timer />
      </Suspense>
    </main>
  );
} 