import React from "react";
import "../styles/PlayerEngagement.css";
import {
  DASHBOARD_KPI,
  WEEKLY_PLAYTIME,
  REGIONAL_COMPLETION,
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
        <section className="chart-section">
          <h3>Weekly Community Playtime (Hours)</h3>

          <div className="bar-chart">
            {WEEKLY_PLAYTIME.map((data, index) => {
              const barHeight = (data.hours / maxHours) * 100;

              return (
                <div key={index} className="bar-container">
                  <div
                    className="bar"
                    style={{ height: `${barHeight}%` }}
                  >
                    <span className="bar-tooltip">
                      {data.hours} hrs
                    </span>
                  </div>
                  <span className="bar-label">{data.week}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Regional Completion */}
        <section className="table-section">
          <h3>Regional Completion Rates</h3>

          <table className="engagement-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Users</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {REGIONAL_COMPLETION.map((item) => (
                <tr key={item.id}>
                  <td>{item.region}</td>
                  <td>{item.active}</td>
                  <td>
                    <div className="progress-wrap">
                      <div className="progress-bg">
                        <div
                          className="progress-fill"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="progress-text">
                        {item.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

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
