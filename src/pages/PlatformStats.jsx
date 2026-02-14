import React, { useMemo } from "react";
import "../styles/PlatformStats.css";
import {
  PLATFORM_KPI,
  INSTALL_CHART_DATA,
  STORE_DISTRIBUTION,
  PLATFORM_DETAILS,
} from "../common/MockData";

export default function PlatformStats() {
  const MONTHS = useMemo(
    () => ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    []
  );

  // Normalize data to 12 months
  const chartData = useMemo(() => {
    const map = new Map((INSTALL_CHART_DATA || []).map((d) => [String(d.month), d]));

    return MONTHS.map((m) => {
      const src = map.get(m) || {};
      return {
        month: m,
        ios: Number(src.ios ?? 0),
        android: Number(src.android ?? 0),
        uninstalls: Number(src.uninstalls ?? 0),
      };
    });
  }, [MONTHS]);

  const maxInstallValue = useMemo(() => {
    const all = chartData.flatMap((m) => [m.ios + m.android, m.uninstalls]);
    const max = Math.max(...all, 0);
    return max > 0 ? max : 1;
  }, [chartData]);

  const getBarStyle = (value) => {
    const pct = (value / maxInstallValue) * 100;
    return {
      height: `${pct}%`,
      minHeight: value > 0 ? "6px" : "0px",
    };
  };

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

          <div className="ps-bar-chart-frame">
            <div className="ps-bar-chart">
              {chartData.map((item) => {
                const installs = item.ios + item.android;

                return (
                  <div key={item.month} className="ps-bar-group">
                    <div className="ps-bar-stack">
                      <div
                        className="ps-bar ps-installs"
                        style={getBarStyle(installs)}
                        title={`Installs: ${installs}`}
                      />
                      <div
                        className="ps-bar ps-uninstall"
                        style={getBarStyle(item.uninstalls)}
                        title={`Uninstalls: ${item.uninstalls}`}
                      />
                    </div>

                    <span className="ps-bar-label">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ps-legend">
            <span className="ps-dot ps-installs" /> Installs
            <span className="ps-dot ps-uninstall" /> Uninstalls
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
