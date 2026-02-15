import React from "react";
import "../styles/PlayerEngagement.css";
import {
  DASHBOARD_KPI,
  WEEKLY_PLAYTIME,
  DAILY_ACTIVE_USERS,
  TOP_PLAYERS,
} from "../common/MockData";


const PlayerEngagement = () => {
  const maxHours = Math.max(...WEEKLY_PLAYTIME.map((d) => d.hours), 1);

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-text">
          <h1>SIKLAB Analytics</h1>
          <p>Player Engagement & Historical Progress</p>
        </div>
      </header>

      {/* KPI CARDS */}
      <section className="stats-grid">
        {DASHBOARD_KPI.map((stat, index) => (
          <div key={index} className="stat-card">
            <span className="stat-label">{stat.title}</span>
            <h2 className="stat-value">{stat.value}</h2>
            <span className="stat-trend">{stat.trend}</span>
          </div>
        ))}
      </section>

      {/* TOP GRID */}
      <div className="dashboard-top-grid">
        {/* Weekly Playtime */}
        {/* Weekly Playtime (Landscape) */}
<section className="chart-section">
  <h3>Weekly Community Playtime (Hours)</h3>

  <div className="horizontal-chart">
    {WEEKLY_PLAYTIME.map((data, index) => {
      const barWidth = (data.hours / maxHours) * 100;

      return (
        <div key={index} className="horizontal-row">
          <span className="horizontal-label">{data.week}</span>

          <div className="horizontal-bar-bg">
            <div
              className="horizontal-bar-fill"
              style={{ width: `${barWidth}%` }}
            />
          </div>

          <span className="horizontal-value">
            {data.hours} hrs
          </span>
        </div>
      );
    })}
  </div>
</section>

      </div>
{/* Daily Active Users */}
{/* Daily Active Users */}
<section className="chart-section">
  <h3>Daily Active Users</h3>

  <div className="line-chart">
    <svg viewBox="0 0 600 200" preserveAspectRatio="none">
      {(() => {
        const maxUsers = Math.max(
          ...DAILY_ACTIVE_USERS.map((d) => d.users),
          1
        );

        const points = DAILY_ACTIVE_USERS.map((d, i) => {
          const x =
            (i / (DAILY_ACTIVE_USERS.length - 1)) * 600;
          const y =
            200 - (d.users / maxUsers) * 160;
          return { x, y, value: d.users };
        });

        return (
          <>
            {/* Line */}
            <polyline
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
              points={points.map(p => `${p.x},${p.y}`).join(" ")}
            />

            {/* Circles + Numbers */}
            {points.map((p, i) => (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="#3b82f6"
                />
                <text
                  x={p.x}
                  y={p.y - 10}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#fbbf24"
                >
                  {p.value}
                </text>
              </g>
            ))}
          </>
        );
      })()}
    </svg>

    <div className="line-labels">
      {DAILY_ACTIVE_USERS.map((d, i) => (
        <span key={i}>{d.day}</span>
      ))}
    </div>
  </div>
</section>


      {/* Top Players */}
      <section className="table-section top-players-section">
        <h3>Top Players Engagement</h3>

        <div className="table-scroll">
          <table className="players-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player Name</th>
                <th>Total Hours</th>
                <th>1-Day Retention</th>
                <th>7-Day Retention</th>
                <th>Avg. Session (min)</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PLAYERS.map((player, index) => (
                <tr key={player.userId}>
                  <td>{index + 1}</td>
                  <td>{player.playerName}</td>
                  <td>{player.hours}</td>
                  <td>{player.retention1}%</td>
                  <td>{player.retention7}%</td>
                  <td>{player.avgSession}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PlayerEngagement;
