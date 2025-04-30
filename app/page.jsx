import { Suspense } from 'react';
import Timer from './components/Timer';

export const metadata = {
  title: 'EVA POMODORO | Evangelion-inspired Productivity Timer',
  description: 'Boost your productivity with this Evangelion-inspired Pomodoro timer featuring glitch effects and customizable time settings.',
};

export default function HomePage() {
  return (
    <main className="content-wrapper" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      <h1 className="visually-hidden">EVA POMODORO - Evangelion-inspired Productivity Timer</h1>
      <div className="timer-container">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Timer />
        </Suspense>
      </div>
      <footer className="eva-footer">
        <div className="footer-content">
          <a href="https://github.com/iPolyomino" target="_blank" rel="noopener noreferrer" className="footer-link">原作</a>
          <span className="terminal-cursor">|</span>
          <a href="https://0xechan.xyz" target="_blank" rel="noopener noreferrer" className="footer-link">NERV-02</a>
          <span className="rebuild-note">rebuild</span>
        </div>
      </footer>
    </main>
  );
} 