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
  Legend,
} from "recharts";
import {
  DASHBOARD_KPI,
  DAILY_ACTIVE_USERS,
  WEEKLY_PLAYTIME,
  TOP_PLAYERS,
  STORE_DISTRIBUTION,
} from "../common/MockData";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Section Title */}
      <h2 className="section-title">Overview</h2>

      {/* KPI Cards */}
      <div className="stats-grid">
        {DASHBOARD_KPI.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            style={{ borderTop: `4px solid ${stat.color}` }}
          >
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
            <span className="stat-trend">{stat.trend}</span>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Daily Active Users */}
        <div className="chart-card">
          <h3>Daily Active Users</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={DAILY_ACTIVE_USERS}>
              <CartesianGrid stroke="#2c2c4f" strokeDasharray="4 4" />
              <XAxis dataKey="day" stroke="#c084fc" tickLine={false} />
              <YAxis stroke="#c084fc" tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a3a",
                  border: "none",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 4, stroke: "#c084fc", strokeWidth: 2, fill: "#1a1a3a" }}
                activeDot={{ r: 6, fill: "#c084fc" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Playtime */}
        <div className="chart-card">
          <h3>Weekly Playtime (Hours)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={WEEKLY_PLAYTIME}>
              <CartesianGrid stroke="#2c2c4f" strokeDasharray="4 4" />
              <XAxis dataKey="week" stroke="#c084fc" tickLine={false} />
              <YAxis stroke="#c084fc" tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a3a",
                  border: "none",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
              />
              <Legend wrapperStyle={{ color: "#ffffff" }} />
              <Bar dataKey="hours" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
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
                <div
                  className="store-bar"
                  style={{
                    width: `${store.value}%`,
                    backgroundColor: store.color,
                  }}
                ></div>
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
