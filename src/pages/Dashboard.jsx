import React from "react";
import "../styles/Dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { DASHBOARD_KPI, DAILY_ACTIVE_USERS, WEEKLY_PLAYTIME, TOP_PLAYERS, STORE_DISTRIBUTION } 
from "../common/MockData";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2 className="section-title">Overview</h2>

      {/* KPI Cards */}
      <div className="stats-grid">
        {DASHBOARD_KPI.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTop: `4px solid ${stat.color}` }}>
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
            <span className="stat-trend">{stat.trend}</span>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Daily Active Users</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={DAILY_ACTIVE_USERS}>
              <CartesianGrid stroke="#9c5e5e" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#fbbf24" />
              <YAxis stroke="#fbbf24" />
              <Tooltip contentStyle={{ backgroundColor: "#456aa5", border: "none", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="users" stroke="#e0bef7" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Weekly Playtime (Hours)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={WEEKLY_PLAYTIME}>
              <CartesianGrid stroke="#9c5e5e" strokeDasharray="3 3" />
              <XAxis dataKey="week" stroke="#fbbf24" />
              <YAxis stroke="#fbbf24" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="hours" fill="#e0bef7" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Players Table */}
      <div className="table-card">
        <h3>Top 5 Players</h3>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Hours Played</th>
            </tr>
          </thead>
          <tbody>
            {TOP_PLAYERS.map((player) => (
              <tr key={player.rank}>
                <td>{player.rank}</td>
                <td>{player.name}</td>
                <td>{player.hours} hrs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Store Distribution */}
      <div className="table-card">
        <h3>Store Distribution</h3>
        <div className="store-list">
          {STORE_DISTRIBUTION.map((store, idx) => (
            <div className="store-row" key={idx}>
              <div className="store-name">{store.name}</div>
              <div className="store-bar-wrapper">
                <div className="store-bar" style={{ width: `${store.value}%`, backgroundColor: store.color }}></div>
              </div>
              <div className="store-value">{store.value}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
