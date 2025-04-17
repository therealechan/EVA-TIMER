'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Timer() {
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [milliseconds, setMilliseconds] = useState('00');
  const [isCountdownTimer, setIsCountdownTimer] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [noiseIntensity, setNoiseIntensity] = useState(1);
  const [activeTimer, setActiveTimer] = useState('normal'); // 'slow', 'normal', 'racing'
  const [isLastMinute, setIsLastMinute] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(false);
  
  const timeRef = useRef(5 * 60 * 1000);
  const remainingTimeRef = useRef(null);
  const startTimeRef = useRef(null);
  const timerIdRef = useRef(null);
  const glitchTimeoutRef = useRef(null);
  const noiseTimeoutRef = useRef(null);
  const maxMinutes = 100;
  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check if the device is a mobile or small screen
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
      setIsVerySmallScreen(window.innerWidth <= 380);
    };
    
    // Initial check
    checkMobileView();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobileView);
    
    // Initialize timer based on URL parameters
    const timeParam = parseFloat(searchParams.get('time'), 10);
    const isNumber = (value) => typeof value === 'number' && isFinite(value);
    
    if (isNumber(timeParam) && 0 <= timeParam && timeParam < maxMinutes) {
      timeRef.current = timeParam * 60 * 1000;
      
      // Set active timer based on time parameter
      if (timeParam === 45) {
        setActiveTimer('slow');
      } else if (timeParam === 25) {
        setActiveTimer('normal');
      } else if (timeParam === 5) {
        setActiveTimer('racing');
      }
    }
    
    const isStopwatch = searchParams.get('stopwatch');
    if (isStopwatch !== null) {
      externalAction();
    } else {
      internalAction();
    }
    
    // Set up random glitch effects
    setupRandomGlitches();
    
    // Set up random noise intensity changes
    setupNoiseIntensity();
    
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
      if (noiseTimeoutRef.current) {
        clearTimeout(noiseTimeoutRef.current);
      }
      window.removeEventListener('resize', checkMobileView);
    };
  }, [searchParams]);
  
  // Set up random noise intensity changes
  const setupNoiseIntensity = () => {
    const changeNoiseIntensity = () => {
      // Reduce intensity on mobile to improve performance
      const baseIntensity = isMobileView ? 0.6 : 0.8;
      const maxIntensity = isMobileView ? 1.0 : 1.5;
      
      // Randomly change noise intensity
      const intensity = baseIntensity + Math.random() * (maxIntensity - baseIntensity);
      setNoiseIntensity(intensity);
      
      // Schedule next change
      const nextChangeTime = Math.random() * 5000 + 2000; // 2-7 seconds
      noiseTimeoutRef.current = setTimeout(changeNoiseIntensity, nextChangeTime);
    };
    
    // Start the noise cycle
    noiseTimeoutRef.current = setTimeout(changeNoiseIntensity, Math.random() * 3000);
  };
  
  // Set up random glitch effects that occur periodically
  const setupRandomGlitches = () => {
    const triggerGlitch = () => {
      setShowGlitch(true);
      
      // Reset glitch after a short time
      setTimeout(() => {
        setShowGlitch(false);
      }, 150);
      
      // Schedule next glitch - less frequent on mobile for better performance
      const nextGlitchTime = Math.random() * (isMobileView ? 15000 : 10000) + (isMobileView ? 5000 : 3000);
      glitchTimeoutRef.current = setTimeout(triggerGlitch, nextGlitchTime);
    };
    
    // Start the glitch cycle
    const initialDelay = Math.random() * 5000; // Random initial delay
    glitchTimeoutRef.current = setTimeout(triggerGlitch, initialDelay);
  };
  
  const updateTimeText = (time) => {
    let m = Math.floor(time / (1000 * 60)) % 100;
    let s = Math.floor((time % (1000 * 60)) / 1000);
    let ms = time % 1000;
    
    m = `0${m}`.slice(-2);
    s = `0${s}`.slice(-2);
    ms = `00${ms}`.slice(-3).slice(0, 2);
    
    setMinutes(m);
    setSeconds(s);
    setMilliseconds(ms);
    
    // Check for last minute
    if (isCountdownTimer && time <= 60000 && time > 0) {
      setIsLastMinute(true);
      // Increase noise and glitch effects in the last minute
      setNoiseIntensity(1.5 + (60000 - time) / 30000); // Gradually increase noise as time runs out
      
      // Trigger glitches more frequently during last minute
      if (Math.random() < 0.2) { // 20% chance every update
        setShowGlitch(true);
        setTimeout(() => {
          setShowGlitch(false);
        }, 100 + Math.random() * 150);
      }
    } else {
      setIsLastMinute(false);
    }
  };
  
  const update = () => {
    timerIdRef.current = setTimeout(() => {
      const now = Date.now();
      if (isCountdownTimer) {
        remainingTimeRef.current -= now - startTimeRef.current;
      } else {
        remainingTimeRef.current += now - startTimeRef.current;
      }
      startTimeRef.current = now;
      if (remainingTimeRef.current > 0 || !isCountdownTimer) {
        update();
      } else {
        remainingTimeRef.current = 0;
        // Trigger continuous glitch effect when timer reaches zero
        setShowGlitch(true);
        // Increase noise when timer ends
        setNoiseIntensity(2);
        // Stop the timer when it reaches zero
        stopAction();
      }
      updateTimeText(remainingTimeRef.current);
    }, 10);
  };
  
  const internalAction = () => {
    setIsCountdownTimer(true);
    resetAction();
    setShowGlitch(false);
    setNoiseIntensity(1);
    setIsLastMinute(false);
  };
  
  const externalAction = () => {
    setIsCountdownTimer(false);
    resetAction();
    setShowGlitch(false);
    setNoiseIntensity(1);
    setIsLastMinute(false);
  };
  
  const startAction = () => {
    if (timerIdRef.current !== null) return;
    
    startTimeRef.current = Date.now();
    setIsRunning(true);
    update();
  };
  
  const stopAction = () => {
    if (timerIdRef.current === null) return;
    
    clearTimeout(timerIdRef.current);
    timerIdRef.current = null;
    setIsRunning(false);
  };
  
  // Combined function to toggle between start and stop
  const toggleStartStopAction = () => {
    if (isRunning) {
      stopAction();
    } else {
      startAction();
    }
  };
  
  const resetAction = () => {
    stopAction();
    if (isCountdownTimer) {
      remainingTimeRef.current = timeRef.current;
    } else {
      remainingTimeRef.current = 0;
    }
    updateTimeText(remainingTimeRef.current);
    setShowGlitch(false);
    setNoiseIntensity(1);
    setIsLastMinute(false);
  };
  
  // New time setup actions
  const setSlowTimer = () => {
    if (!isCountdownTimer) return;
    
    // Set to 45 minutes
    timeRef.current = 45 * 60 * 1000;
    resetAction();
    // Auto start timer
    startTimeRef.current = Date.now();
    setIsRunning(true);
    setActiveTimer('slow');
    update();
  };
  
  const setNormalTimer = () => {
    if (!isCountdownTimer) return;
    
    // Set to 25 minutes
    timeRef.current = 25 * 60 * 1000;
    resetAction();
    // Auto start timer
    startTimeRef.current = Date.now();
    setIsRunning(true);
    setActiveTimer('normal');
    update();
  };
  
  const setRacingTimer = () => {
    if (!isCountdownTimer) return;
    
    // Set to 5 minutes
    timeRef.current = 5 * 60 * 1000;
    resetAction();
    // Auto start timer
    startTimeRef.current = Date.now();
    setIsRunning(true);
    setActiveTimer('racing');
    update();
  };
  
  // Generate CSS variable style for noise intensity and emergency state
  const timerStyle = {
    '--noise-intensity': noiseIntensity,
    ...(isLastMinute ? { 
      backgroundColor: 'red',
    } : {})
  };
  
  // Style for timer digits in emergency mode
  const timerDigitStyle = isLastMinute ? { color: '#FF0000' } : {};
  
  // Border style for emergency mode
  const borderStyle = isLastMinute ? { borderColor: '#FF0000' } : {};
  
  // Additional class for mobile view
  const mobileClass = isMobileView ? 'mobile-view' : '';
  
  // Format button text based on screen size
  const formatButtonText = (text) => {
    if (isVerySmallScreen) {
      // Remove spaces for very small screens
      return text.replace(/ /g, '');
    } else if (isMobileView) {
      // Reduce spacing for mobile
      return text;
    } else {
      // Keep the original spaced format for larger screens
      return text;
    }
  };
  
  return (
    <div className={`timer ${isLastMinute ? 'emergency' : ''} ${mobileClass}`} style={timerStyle}>
      {/* Glitch effect overlays */}
      <div className={`screen-glitch ${showGlitch ? 'flicker' : ''}`}></div>
      <div className="scanlines"></div>
      <div className="h-scanlines"></div>
      <div className="noise"></div>
      <div className="tv-static"></div>
      <div className="crt"></div>
      
      <div className="limit-info">
        <span className="display-area">活動限界まで</span>
        <span className="active-time-remaining display-area glitch" data-text="ACTIVE TIME REMAINING:">ACTIVE TIME REMAINING:</span>
        <span></span>
      </div>
      <div className="remain">
        <span className="display-area">あと</span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="time display-area">
        <span className="minute-second-area">
          <span id="minute" className={showGlitch ? 'glitch' : ''} data-text={minutes} style={timerDigitStyle}>{minutes}</span>:
          <span id="second" className={showGlitch ? 'glitch' : ''} data-text={seconds} style={timerDigitStyle}>{seconds}</span>
          <span className="millisecond-area">:
            <span id="millisecond" className={showGlitch ? 'glitch' : ''} data-text={milliseconds} style={timerDigitStyle}>{milliseconds}</span>
          </span>
        </span>
      </div>
      <div className="energy display-area">
        <button 
          id="internal-button" 
          className={`energy-item ${!isCountdownTimer ? 'disabled' : ''}`}
          onClick={internalAction}
        >
          <div className="power-system" style={borderStyle}>
            <div>内部</div>
            <div className={showGlitch ? 'glitch' : ''} data-text="I N T E R N A L">I N T E R N A L</div>
            <div></div>
          </div>
        </button>
        <div className="energy-item">
          <div className="power-supply" style={borderStyle}>
            <div>主電源供給システム</div>
            <div className={showGlitch ? 'glitch' : ''} data-text="MAIN ENERGY SUPPLY SYSTEM">MAIN ENERGY SUPPLY SYSTEM</div>
          </div>
        </div>
        <button 
          id="external-button" 
          className={`energy-item ${isCountdownTimer ? 'disabled' : ''}`}
          onClick={externalAction}
        >
          <div className="power-system" style={borderStyle}>
            <div>外部</div>
            <div className={showGlitch ? 'glitch' : ''} data-text="E X T E R N A L">E X T E R N A L</div>
            <div></div>
          </div>
        </button>
      </div>
      <div className="control">
        <button 
          id="stop-button" 
          className={`${isRunning ? 'active-control' : ''} display-area`}
          onClick={toggleStartStopAction}
          style={borderStyle}
        >
          <div className={showGlitch ? 'glitch' : ''} data-text={isRunning ? (isVerySmallScreen ? "STOP" : "S T O P") : (isVerySmallScreen ? "START" : "S T A R T")}>
            {isRunning ? formatButtonText("S T O P") : formatButtonText("S T A R T")}
          </div>
          <div></div>
        </button>
        <button 
          id="slow-button" 
          className={`${isCountdownTimer && activeTimer === 'slow' ? 'active-control' : ''} display-area`}
          onClick={setSlowTimer}
          style={borderStyle}
        >
          <div className={showGlitch ? 'glitch' : ''} data-text={isVerySmallScreen ? "SLOW" : "S L O W"}>
            {formatButtonText("S L O W")}
          </div>
          <div></div>
        </button>
        <button 
          id="normal-button" 
          className={`${isCountdownTimer && activeTimer === 'normal' ? 'active-control' : ''} display-area`}
          onClick={setNormalTimer}
          style={borderStyle}
        >
          <div className={showGlitch ? 'glitch' : ''} data-text={isVerySmallScreen ? "NORMAL" : "N O R M A L"}>
            {formatButtonText("N O R M A L")}
          </div>
          <div></div>
        </button>
        <button 
          id="racing-button" 
          className={`${isCountdownTimer && activeTimer === 'racing' ? 'active-control' : ''} display-area`}
          onClick={setRacingTimer}
          style={borderStyle}
        >
          <div className={showGlitch ? 'glitch' : ''} data-text={isVerySmallScreen ? "RACING" : "R A C I N G"}>
            {formatButtonText("R A C I N G")}
          </div>
          <div></div>
        </button>
      </div>
      <div className="black-area danger-emargency"></div>
      <div className="black-area brank-area"></div>
    </div>
  );
} 