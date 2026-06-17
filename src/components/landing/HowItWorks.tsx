"use client";

import { useEffect, useState } from "react";

const STEPS = [
  {
    title: "Connect your goals",
    desc: "Select your target band score and test date. Our platform customizes your study plan based on your current level.",
    roman: "I"
  },
  {
    title: "Practice with AI",
    desc: "Complete daily tasks in Reading, Listening, Writing, and Speaking. Get instant AI evaluations and feedback.",
    roman: "II"
  },
  {
    title: "Succeed on Test Day",
    desc: "Take full-length mock tests under real conditions. Walk into your test center with confidence and proven results.",
    roman: "III"
  }
];

export default function LandingHowItWorks() {
  const [currentStep, setCurrentStep] = useState(0);
  const DURATION = 5000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="how">
      <div className="landing-container">
        <div className="how-grid">
          <div>
            <div className="label dark-label fade">Process</div>
            <h2 className="how-h fade d1">Three steps.<br/><span className="dim">Infinite possibilities.</span></h2>
            <ul className="steps" id="steps-list">
              {STEPS.map((step, i) => (
                <li key={i}>
                  <button 
                    className={`step-btn ${currentStep === i ? '' : 'inactive'}`} 
                    onClick={() => setCurrentStep(i)}
                  >
                    <div className="step-inner">
                      <span className="step-roman">{step.roman}</span>
                      <div className="step-text">
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                        <div className="step-progress">
                          <div 
                            className="step-progress-bar" 
                            style={{ 
                              width: currentStep === i ? '100%' : '0%',
                              transition: currentStep === i ? `width ${DURATION}ms linear` : 'none'
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="cw fade d2">
            <div className="cw-bar">
              <span className="cw-dot r"></span><span className="cw-dot y"></span><span className="cw-dot g"></span>
              <span className="cw-file">study-session.ts</span>
            </div>
            <div className="cw-body">
              <span className="ck">import</span> {'{'} <span className="cf">doshomik</span> {'}'} <span className="ck">from</span> <span className="cs">&apos;@doshomik/core&apos;</span><br/>
              <br/>
              doshomik.<span className="cf">init</span>({'{'}<br/>
              &nbsp;&nbsp;<span className="cv">targetBand</span>: <span className="cn">8.5</span>,<br/>
              &nbsp;&nbsp;<span className="cv">modules</span>: [<span className="cs">&apos;writing&apos;</span>, <span className="cs">&apos;speaking&apos;</span>]<br/>
              {'}'})<br/>
              <br/>
              <span className="ck">const</span> <span className="cv">session</span> = <span className="ck">await</span> doshomik.<span className="cf">startPractice</span>({'{'}<br/>
              &nbsp;&nbsp;<span className="cv">mode</span>: <span className="cs">&apos;ai-evaluate&apos;</span>,<br/>
              &nbsp;&nbsp;<span className="cv">topic</span>: <span className="cs">&apos;Education &amp; Technology&apos;</span><br/>
              {'}'})<br/>
              <br/>
              <span className="cc">{'//'} Analyze performance instantly</span><br/>
              <span className="ck">const</span> <span className="cv">report</span> = <span className="ck">await</span> session.<span className="cf">getFeedback</span>()
            </div>
            <div className="cw-footer">
              <span className="cw-ready-dot"></span>
              <span className="cw-ready-txt">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
