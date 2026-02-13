import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/UserInsights.css";
import {
  USER_LIST,
  NEW_VS_RETURNING,
  AVG_PLAYTIME_PER_STUDENT,
  COMPLETION_BY_GRADE,
} from "../common/MockData";

/* --------- helpers --------- */
const isKinderGrade = (g) => {
  const v = String(g || "").toLowerCase().trim();
  return v === "kinder" || v === "kindergarten" || v === "k";
};

/* ---------- Settings-style Dropdown (Portal + scroll-safe) ---------- */
function GlassSelect({ value, options, onChange, placeholder = "Select..." }) {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  const btnRef = useRef(null);
  const panelIdRef = useRef(`gs-panel-${Math.random().toString(16).slice(2)}`);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder;

  const computePos = () => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      top: r.bottom + 8,
      left: r.left,
      width: r.width,
    });
  };

  useEffect(() => {
    if (!open) return;

    computePos();

    setAnimate(false);
    requestAnimationFrame(() => setAnimate(true));

    const onScroll = () => computePos();
    const onResize = () => computePos();

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onPointerDown = (e) => {
      const trigger = btnRef.current;
      const panel = document.getElementById(panelIdRef.current);
      if (!trigger) return;

      const clickedTrigger = trigger.contains(e.target);
      const clickedPanel = panel && panel.contains(e.target);

      if (!clickedTrigger && !clickedPanel) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      setAnimate(false);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={`gs-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="gs-value">{selectedLabel}</span>
        <span className={`gs-chevron ${open ? "open" : ""}`}>▾</span>
      </button>

      {open &&
        createPortal(
          <div
            id={panelIdRef.current}
            className={`gs-panel-portal ${animate ? "open" : ""}`}
            role="listbox"
            style={{
              top: `${pos.top}px`,
              left: `${pos.left}px`,
              width: `${pos.width}px`,
            }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`gs-option ${opt.value === value ? "active" : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                role="option"
                aria-selected={opt.value === value}
              >
                {opt.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

const UserInsights = () => {
  const [filters, setFilters] = useState({
    ageRange: "",
    gradeLevel: "",
    gender: "",
  });

  const setFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ ageRange: "", gradeLevel: "", gender: "" });
  };

  // Base: remove Kinder users entirely
  const baseUsers = useMemo(
    () => USER_LIST.filter((u) => !isKinderGrade(u.grade)),
    []
  );

  // Filter logic
  const filteredUsers = useMemo(() => {
    return baseUsers.filter((user) => {
      return (
        (filters.ageRange === "" || user.age === filters.ageRange) &&
        (filters.gradeLevel === "" || user.grade === filters.gradeLevel) &&
        (filters.gender === "" || user.gender === filters.gender)
      );
    });
  }, [baseUsers, filters]);

  // Basic stats
  const totalCount = filteredUsers.length;
  const femaleCount = filteredUsers.filter((u) => u.gender === "female").length;
  const maleCount = filteredUsers.filter((u) => u.gender === "male").length;

  const femalePercent =
    totalCount > 0 ? ((femaleCount / totalCount) * 100).toFixed(0) : 0;
  const malePercent =
    totalCount > 0 ? ((maleCount / totalCount) * 100).toFixed(0) : 0;

  const playtimeNoKinder = useMemo(
    () => AVG_PLAYTIME_PER_STUDENT.filter((x) => !isKinderGrade(x.grade)),
    []
  );

  const completionNoKinder = useMemo(
    () => COMPLETION_BY_GRADE.filter((x) => !isKinderGrade(x.grade)),
    []
  );

  return (
    <div className="userinsights">
      <div className="ui-header">
        <div>
          <h2 className="section-title">User Insights</h2>
          <p className="section-sub">
            Filter demographics and view player trends.
          </p>
        </div>

        <button
          type="button"
          className="ui-btn ghost"
          onClick={resetFilters}
          disabled={!filters.ageRange && !filters.gradeLevel && !filters.gender}
        >
          Reset Filters
        </button>
      </div>

      {/* Filters */}
      <div className="ui-card filters-card">
        <div className="ui-card-head">
          <h3>Filter Demographics</h3>
          <span className="helper-text">
            Total users shown: <strong>{totalCount}</strong>
          </span>
        </div>

        <div className="filters-grid">
          <div className="form-group">
            <label>Age Range</label>
            <GlassSelect
              value={filters.ageRange}
              onChange={(v) => setFilter("ageRange", v)}
              placeholder="All Ages"
              options={[
                { value: "", label: "All Ages" },
                { value: "6-12", label: "6-12" },
                { value: "13-16", label: "13-16" },
                { value: "16-19", label: "16-19" },
              ]}
            />
          </div>

          <div className="form-group">
            <label>Grade Level</label>
            <GlassSelect
              value={filters.gradeLevel}
              onChange={(v) => setFilter("gradeLevel", v)}
              placeholder="All Grades"
              options={[
                { value: "", label: "All Grades" },
                { value: "grade1", label: "Grade 1" },
                { value: "grade2", label: "Grade 2" },
                { value: "grade3", label: "Grade 3" },
                { value: "grade4", label: "Grade 4" },
                { value: "grade5", label: "Grade 5" },
                { value: "grade6", label: "Grade 6" },
                { value: "grade7-10", label: "Grade 7-10" },
                { value: "grade11-12", label: "Grade 11-12" },
              ]}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <GlassSelect
              value={filters.gender}
              onChange={(v) => setFilter("gender", v)}
              placeholder="All Genders"
              options={[
                { value: "", label: "All Genders" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="ui-card stat-card">
          <h3 className="stat-num">{totalCount}</h3>
          <p>Total Filtered Users</p>
        </div>

        <div className="ui-card stat-card">
          <h3 className="stat-num">{femalePercent}%</h3>
          <p>Female Ratio</p>
        </div>

        <div className="ui-card stat-card">
          <h3 className="stat-num">{malePercent}%</h3>
          <p>Male Ratio</p>
        </div>
      </div>

      {/* New vs Returning */}
      <div className="ui-card demographics-card">
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
      <div className="ui-card demographics-card">
        <h3>Average Playtime per Grade (minutes)</h3>
        <div className="simple-list">
          {playtimeNoKinder.map((item, idx) => (
            <div key={idx} className="simple-row">
              <span>{item.grade}</span>
              <strong>{item.minutes} min</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Rate by Grade */}
      <div className="ui-card demographics-card">
        <h3>Completion Rate by Grade</h3>
        <div className="simple-list">
          {completionNoKinder.map((item, idx) => (
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
