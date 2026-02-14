import React from "react";
import "../styles/PlatformStats.css";
import {
  PLATFORM_KPI,
  INSTALL_CHART_DATA,
  STORE_DISTRIBUTION,
  PLATFORM_DETAILS,
} from "../common/MockData"; 

export default function PlatformStats() {
  const maxInstallValue = Math.max(
    ...INSTALL_CHART_DATA.flatMap((m) => [m.ios, m.android, m.uninstalls])
  );

  return (
    <div className="platform-stats">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Platform Statistics</h1>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {PLATFORM_KPI.map((kpi, idx) => (
          <div key={idx} className="kpi-card">
            <div className="kpi-title">{kpi.title}</div>
            <div className="kpi-value" style={{ color: kpi.color }}>
              {kpi.value}
            </div>
            <div className="kpi-trend">{kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Install Chart */}
        <div className="card">
          <h2>Installs & Uninstalls</h2>
          <div className="bar-chart">
            {INSTALL_CHART_DATA.map((item, idx) => (
              <div key={idx} className="bar-group">
                <div
                  className="bar ios"
                  style={{ height: `${(item.ios / maxInstallValue) * 100}%` }}
                  title={`iOS: ${item.ios}`}
                />
                <div
                  className="bar android"
                  style={{ height: `${(item.android / maxInstallValue) * 100}%` }}
                  title={`Android: ${item.android}`}
                />
                <div
                  className="bar uninstall"
                  style={{ height: `${(item.uninstalls / maxInstallValue) * 100}%` }}
                  title={`Uninstalls: ${item.uninstalls}`}
                />
                <span className="bar-label">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="legend">
            <span className="dot ios" /> iOS
            <span className="dot android" /> Android
            <span className="dot uninstall" /> Uninstalls
          </div>
        </div>

        {/* Store Distribution */}
        <div className="card">
          <h2>Store Distribution</h2>
          <div className="store-list">
            {STORE_DISTRIBUTION.map((store, idx) => (
              <div key={idx} className="store-row">
                <div className="store-name">{store.name}</div>
                <div className="store-bar-wrapper">
                  <div
                    className="store-bar"
                    style={{
                      width: `${store.value}%`,
                      backgroundColor: store.color,
                    }}
                  />
                </div>
                <div className="store-value">{store.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Details Table */}
      <div className="card">
        <h2>Platform Details</h2>
        <table className="platform-table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Version</th>
              <th>Crash Rate</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {PLATFORM_DETAILS.map((p, idx) => (
              <tr key={idx}>
                <td>{p.platform}</td>
                <td>{p.version}</td>
                <td>{p.crashes}</td>
                <td>{p.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
