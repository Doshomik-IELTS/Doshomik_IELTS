"use client";

import { useState } from "react";

const INITIAL_CHART_BARS = [38, 42, 45, 40, 55, 60, 58, 72, 68, 80, 85, 78, 90, 88, 100];

export default function LandingStats() {
  const [chartBars] = useState<number[]>(INITIAL_CHART_BARS);

  return (
    <>
      <section id="infra">
        <div className="landing-container">
          <div className="infra-grid">
            <div className="fade">
              <div className="label">Ecosystem</div>
              <h2 className="infra-h">Global by<br/>default.</h2>
              <p className="infra-sub">Access your study materials from anywhere. Our platform is optimized for seamless performance across 6 continents.</p>
              <div className="infra-stats">
                <div>
                  <div className="istat-num">24/7</div>
                  <div className="istat-label">Availability</div>
                </div>
                <div>
                  <div className="istat-num">99.9%</div>
                  <div className="istat-label">Success Rate</div>
                </div>
                <div>
                  <div className="istat-num">&lt;1s</div>
                  <div className="istat-label">AI Analysis</div>
                </div>
              </div>
            </div>
            <div className="server-card fade d2">
              <div className="sc-header">
                <span>Network Status</span>
                <span className="sc-status"><span className="sc-dot"></span>All operational</span>
              </div>
              <StatRow city="Writing Evaluation" region="AI Engine" ping="0.8s" />
              <StatRow city="Speaking Analysis" region="Voice AI" ping="1.2s" />
              <StatRow city="Mock Test Sync" region="Cloud" ping="0.4s" />
              <StatRow city="Vocabulary Match" region="Real-time" ping="0.2s" />
            </div>
          </div>
        </div>
      </section>

      <section id="perf">
        <div className="landing-container">
          <div className="perf-grid">
            <div className="fade">
              <div className="label">Live metrics</div>
              <h2 className="perf-h">Results you<br/>can measure.</h2>
              <div className="big-stats">
                <div className="bstat">
                  <div className="bstat-num">2,847</div>
                  <div className="bstat-label">Tasks completed today</div>
                </div>
                <div className="bstat">
                  <div className="bstat-num">8.5</div>
                  <div className="bstat-label">Average target band</div>
                </div>
              </div>
            </div>
            <div className="chart-wrap fade d2">
              <div className="chart-top">
                <span>Study Activity · 7 days</span>
                <span className="chart-up">↑ 12.4%</span>
              </div>
              <div className="chart-bars">
                {chartBars.map((h, i) => (
                  <div 
                    key={i} 
                    className={`bar ${i >= 11 ? 'hi' : ''}`} 
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatRow({ city, region, ping }: { city: string; region: string; ping: string }) {
  return (
    <div className="sc-row">
      <div className="sc-left"><span className="sc-indicator"></span><div><div className="sc-city">{city}</div><div className="sc-region">{region}</div></div></div>
      <span className="sc-ping">{ping}</span>
    </div>
  );
}
