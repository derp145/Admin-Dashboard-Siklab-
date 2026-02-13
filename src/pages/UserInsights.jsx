import { useState, useMemo } from "react";
import "../styles/UserInsights.css";
import {
  USER_LIST,
  NEW_VS_RETURNING,
  AVG_PLAYTIME_PER_STUDENT,
  COMPLETION_BY_GRADE
} from "../common/MockData";

const UserInsights = () => {
  const [filters, setFilters] = useState({
    ageRange: "",
    gradeLevel: "",
    gender: ""
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter logic
  const filteredData = useMemo(() => {
    return USER_LIST.filter((user) => {
      return (
        (filters.ageRange === "" || user.age === filters.ageRange) &&
        (filters.gradeLevel === "" || user.grade === filters.gradeLevel) &&
        (filters.gender === "" || user.gender === filters.gender)
      );
    });
  }, [filters]);

  // Basic stats
  const totalCount = filteredData.length;
  const femaleCount = filteredData.filter((u) => u.gender === "female").length;
  const maleCount = filteredData.filter((u) => u.gender === "male").length;

  const femalePercent =
    totalCount > 0 ? ((femaleCount / totalCount) * 100).toFixed(0) : 0;
  const malePercent =
    totalCount > 0 ? ((maleCount / totalCount) * 100).toFixed(0) : 0;

  return (
    <div className="userinsights">
      <h2 className="section-title">User Insights</h2>

      {/* Filters */}
      <div className="filters-card">
        <h3>Filter Demographics</h3>
        <div className="filters-grid">
          <div className="form-group">
            <label>Age Range</label>
            <select name="ageRange" value={filters.ageRange} onChange={handleChange}>
              <option value="">All Ages</option>
              <option value="6-12">6-12</option>
              <option value="13-16">13-16</option>
              <option value="16-19">16-19</option>
            </select>
          </div>

          <div className="form-group">
            <label>Grade Level</label>
            <select
              name="gradeLevel"
              value={filters.gradeLevel}
              onChange={handleChange}
            >
              <option value="">All Grades</option>
              <option value="grade1">Grade 1</option>
              <option value="grade2">Grade 2</option>
              <option value="grade3">Grade 3</option>
              <option value="grade4">Grade 4</option>
              <option value="grade5">Grade 5</option>
              <option value="grade6">Grade 6</option>
              <option value="grade7-10">Grade 7-10</option>
              <option value="grade11-12">Grade 11-12</option>
            </select>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={filters.gender} onChange={handleChange}>
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{totalCount}</h3>
          <p>Total Filtered Users</p>
        </div>
        <div className="stat-card">
          <h3>{femalePercent}%</h3>
          <p>Female Ratio</p>
        </div>
        <div className="stat-card">
          <h3>{malePercent}%</h3>
          <p>Male Ratio</p>
        </div>
      </div>

      {/* New vs Returning */}
      <div className="demographics-card">
        <h3>New vs Returning Players</h3>
        <div className="simple-list">
          {NEW_VS_RETURNING.map((item, idx) => (
            <div key={idx} className="simple-row">
              <span>{item.type}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Average Playtime per Grade */}
      <div className="demographics-card">
        <h3>Average Playtime per Grade (minutes)</h3>
        <div className="simple-list">
          {AVG_PLAYTIME_PER_STUDENT.map((item, idx) => (
            <div key={idx} className="simple-row">
              <span>{item.grade}</span>
              <strong>{item.minutes} min</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Rate by Grade */}
      <div className="demographics-card">
        <h3>Completion Rate by Grade</h3>
        <div className="simple-list">
          {COMPLETION_BY_GRADE.map((item, idx) => (
            <div key={idx} className="simple-row">
              <span>{item.grade}</span>
              <strong>{item.completion}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInsights;
