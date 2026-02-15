import React from "react";
import {
  FEEDBACK_LIST,
  FEEDBACK_KPI,
  RATING_DISTRIBUTION,
  FEEDBACK_BY_CATEGORY,
  FEEDBACK_BY_PLATFORM,
} from "../common/MockData";
import "../styles/Feedback.css";

const Feedback = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>User Feedback</h1>
        <p>Insights from players across platforms and categories</p>
      </div>

      {/* KPI GRID */}
      <div className="stats-grid">
        {FEEDBACK_KPI.map((stat, idx) => (
          <div className="stat-card" key={idx} style={{ borderTop: `4px solid ${stat.color}` }}>
            <div className="stat-label">{stat.title}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-trend">{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="dashboard-top-grid">
        {/* Rating Distribution */}
        <div className="chart-section">
          <h3>Rating Distribution</h3>
          <div className="bar-chart">
            {RATING_DISTRIBUTION.map((r) => (
              <div className="bar-container" key={r.rating}>
                <div className="bar" style={{ height: `${r.count * 40}px` }}>
                  <div className="bar-tooltip">{r.count}</div>
                </div>
                <div className="bar-label">{r.rating}★</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback by Category */}
        <div className="chart-section">
          <h3>Feedback by Category</h3>
          <div className="horizontal-chart">
            {FEEDBACK_BY_CATEGORY.map((item) => (
              <div className="horizontal-row" key={item.category}>
                <div className="horizontal-label">{item.category}</div>
                <div className="horizontal-bar-bg">
                  <div
                    className="horizontal-bar-fill"
                    style={{ width: `${item.count * 15 + 10}%` }}
                  ></div>
                </div>
                <div className="horizontal-value">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback by Platform */}
        <div className="chart-section">
          <h3>Feedback by Platform</h3>
          <div className="horizontal-chart">
            {FEEDBACK_BY_PLATFORM.map((item) => (
              <div className="horizontal-row" key={item.platform}>
                <div className="horizontal-label">{item.platform}</div>
                <div className="horizontal-bar-bg">
                  <div
                    className="horizontal-bar-fill"
                    style={{ width: `${(item.count / FEEDBACK_LIST.length) * 100}%` }}
                  ></div>
                </div>
                <div className="horizontal-value">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="table-section table-scroll">
        <h3>Recent Feedback</h3>
        <table className="players-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Rating</th>
              <th>Platform</th>
              <th>Category</th>
              <th>Sentiment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {FEEDBACK_LIST.map((f) => (
              <tr key={f.id}>
                <td>{f.playerName}</td>
                <td>{f.rating}★</td>
                <td>{f.platform}</td>
                <td>{f.category}</td>
                <td
                  style={{
                    color:
                      f.sentiment === "positive"
                        ? "#10b981"
                        : f.sentiment === "negative"
                        ? "#ef4444"
                        : "#fbbf24",
                  }}
                >
                  {f.sentiment}
                </td>
                <td>{f.status}</td>
                <td>{f.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedback;
