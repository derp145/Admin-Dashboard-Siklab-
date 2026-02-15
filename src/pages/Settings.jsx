import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";

/* ---------- Custom Glass Dropdown (Portal + scroll-safe) ---------- */
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

export default function Settings() {
  const navigate = useNavigate();

  const initial = useMemo(
    () => ({
      security: {
        twoFA: false,
        sessionTimeout: 30,
        allowRememberMe: true,
      },
      notifications: {
        emailReports: true,
        securityAlerts: true,
        weeklySummary: true,
        productUpdates: false,
      },
      appearance: {
        theme: "system",
        compactSidebar: false,
        reduceMotion: false,
      },
      system: {
        maintenanceMode: false,
        analyticsTracking: true,
        logLevel: "normal",
      },
    }),
    []
  );

  const [data, setData] = useState(initial);
  const [saved, setSaved] = useState(false);
  const [active, setActive] = useState("profile");

  const update = (section, key, value) => {
    setSaved(false);
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const hasChanges = JSON.stringify(data) !== JSON.stringify(initial);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    console.log("Saved settings:", data);
  };

  const handleReset = () => {
    setData(initial);
    setSaved(false);
  };

  // Refs for scroll targets
  const contentRef = useRef(null);
  const sectionRefs = useRef({
    profile: null,
    security: null,
    notifications: null,
    appearance: null,
    system: null,
  });

  const scrollToSection = (key) => {
    const container = contentRef.current;
    const target = sectionRefs.current[key];
    if (!container || !target) return;

    setActive(key);

    const containerTop = container.getBoundingClientRect().top;
    const targetTop = target.getBoundingClientRect().top;
    const delta = targetTop - containerTop;

    container.scrollTo({
      top: container.scrollTop + delta - 8,
      behavior: "smooth",
    });
  };

  // update active sidebar item while scrolling (fix bottom highlighting)
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onScroll = () => {
      const keys = Object.keys(sectionRefs.current);
      let bestKey = "profile";
      let bestDist = Infinity;

      const containerTop = el.getBoundingClientRect().top;

      keys.forEach((k) => {
        const node = sectionRefs.current[k];
        if (!node) return;

        const dist = Math.abs(node.getBoundingClientRect().top - containerTop - 10);
        if (dist < bestDist) {
          bestDist = dist;
          bestKey = k;
        }
      });

      // If at bottom, always highlight last section
      if (
        el.scrollHeight - el.scrollTop - el.clientHeight < 20
      ) {
        bestKey = "system";
      }

      setActive(bestKey);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Load user profile for read-only profile section
  const [user, setUser] = useState({
    displayName: "",
    fullName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userProfile"));
    if (storedUser) {
      setUser({
        displayName: storedUser.displayName,
        fullName: storedUser.fullName,
        email: storedUser.email,
        role: storedUser.role,
      });
    }
  }, []);

  return (
    <div className="dashboard-container settings-page">
      {/* Top bar */}
      <div className="settings-top">
        <div className="settings-title">
          <h1 className="settings-h1">Settings</h1>
          <p className="settings-sub">
            Manage your admin dashboard preferences and system controls.
          </p>
        </div>

        <div className="settings-actions">
          {saved && <span className="settings-saved">✅ Saved</span>}

          <button
            type="button"
            className="settings-btn settings-btn-ghost"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset
          </button>

          <button
            type="button"
            className="settings-btn settings-btn-primary"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save changes
          </button>
        </div>
      </div>

      {/* Settings layout */}
      <div className="settings-layout">
        <aside className="settings-side">
          <div className="settings-side-card">
            {["profile", "security", "notifications", "appearance", "system"].map(
              (key) => (
                <button
                  key={key}
                  type="button"
                  className={`settings-side-item ${active === key ? "active" : ""}`}
                  onClick={() => scrollToSection(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              )
            )}
          </div>
        </aside>

        <main className="settings-content" ref={contentRef}>

          {/* ------------------ PROFILE (Read-only) ------------------ */}
<div
  ref={(n) => (sectionRefs.current.profile = n)}
  className="settings-section"
>
  <Card title="Profile (Read Only)" desc="Your admin account information.">
    <Row label="Display name">
      <input
        className="settings-input settings-input-readonly read-only-cursor read-only-hover"
        value={user.displayName || ""}
        readOnly
        title="This field is read-only. Edit in Profile page."
      />
    </Row>

    <Row label="Full name">
      <input
        className="settings-input settings-input-readonly read-only-cursor read-only-hover"
        value={user.fullName || ""}
        readOnly
        title="This field is read-only. Edit in Profile page."
      />
    </Row>

    <Row label="Email">
      <input
        className="settings-input settings-input-readonly read-only-cursor read-only-hover"
        value={user.email || ""}
        readOnly
        title="This field is read-only. Edit in Profile page."
      />
    </Row>

    <Row label="Role">
      <input
        className="settings-input settings-input-readonly read-only-cursor read-only-hover"
        value="Administrator"
        readOnly
        title="Role is fixed as Administrator"
      />
    </Row>

    {/* ---------------- EDIT BUTTON ---------------- */}
    <div style={{ marginTop: "12px" }}>
     <button
  className="settings-btn-edit-profile"
  onClick={() => navigate("/dashboard/profile")}
>
  Edit Profile Here
</button>

    </div>
  </Card>
</div>





          {/* ------------------ SECURITY ------------------ */}
          <div
            ref={(n) => (sectionRefs.current.security = n)}
            className="settings-section"
          >
            <Card title="Security" desc="Protect the admin account and sessions.">
              <Toggle
                label="Enable Two-Factor Authentication (2FA)"
                desc="Require an extra verification step during sign-in."
                checked={data.security.twoFA}
                onChange={(v) => update("security", "twoFA", v)}
              />

              <Row label="Session timeout">
                <GlassSelect
                  value={String(data.security.sessionTimeout)}
                  onChange={(v) => update("security", "sessionTimeout", Number(v))}
                  options={[
                    { value: "15", label: "15 minutes" },
                    { value: "30", label: "30 minutes" },
                    { value: "60", label: "1 hour" },
                    { value: "120", label: "2 hours" },
                  ]}
                />
              </Row>

              <Toggle
                label='Allow "Remember me"'
                desc="Lets admins stay signed in on trusted devices."
                checked={data.security.allowRememberMe}
                onChange={(v) => update("security", "allowRememberMe", v)}
              />
            </Card>
          </div>

          {/* ------------------ NOTIFICATIONS ------------------ */}
          <div
            ref={(n) => (sectionRefs.current.notifications = n)}
            className="settings-section"
          >
            <Card title="Notifications" desc="Control what gets sent to your email.">
              <Toggle
                label="Email reports"
                desc="Receive scheduled performance/analytics reports."
                checked={data.notifications.emailReports}
                onChange={(v) => update("notifications", "emailReports", v)}
              />
              <Toggle
                label="Security alerts"
                desc="Get notified about suspicious logins and critical changes."
                checked={data.notifications.securityAlerts}
                onChange={(v) => update("notifications", "securityAlerts", v)}
              />
              <Toggle
                label="Weekly summary"
                desc="A weekly recap of key metrics."
                checked={data.notifications.weeklySummary}
                onChange={(v) => update("notifications", "weeklySummary", v)}
              />
              <Toggle
                label="Product updates"
                desc="Optional announcements and feature updates."
                checked={data.notifications.productUpdates}
                onChange={(v) => update("notifications", "productUpdates", v)}
              />
            </Card>
          </div>

          {/* ------------------ APPEARANCE ------------------ */}
          <div
            ref={(n) => (sectionRefs.current.appearance = n)}
            className="settings-section"
          >
            <Card title="Appearance" desc="UI preferences for the dashboard.">
              <Row label="Theme">
                <GlassSelect
                  value={data.appearance.theme}
                  onChange={(v) => update("appearance", "theme", v)}
                  options={[
                    { value: "system", label: "System" },
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                  ]}
                />
              </Row>

              <Toggle
                label="Compact sidebar"
                desc="Use smaller spacing in the sidebar."
                checked={data.appearance.compactSidebar}
                onChange={(v) => update("appearance", "compactSidebar", v)}
              />

              <Toggle
                label="Reduce motion"
                desc="Minimize animations for accessibility."
                checked={data.appearance.reduceMotion}
                onChange={(v) => update("appearance", "reduceMotion", v)}
              />
            </Card>
          </div>

          {/* ------------------ SYSTEM ------------------ */}
          <div
            ref={(n) => (sectionRefs.current.system = n)}
            className="settings-section"
          >
            <Card title="System" desc="Global admin controls.">
              <Toggle
                label="Maintenance mode"
                desc="Temporarily disable player access while doing updates."
                checked={data.system.maintenanceMode}
                onChange={(v) => update("system", "maintenanceMode", v)}
              />

              <Toggle
                label="Analytics tracking"
                desc="Collect usage analytics for insights pages."
                checked={data.system.analyticsTracking}
                onChange={(v) => update("system", "analyticsTracking", v)}
              />

              <Row label="Log level">
                <GlassSelect
                  value={data.system.logLevel}
                  onChange={(v) => update("system", "logLevel", v)}
                  options={[
                    { value: "minimal", label: "Minimal" },
                    { value: "normal", label: "Normal" },
                    { value: "verbose", label: "Verbose" },
                  ]}
                />
              </Row>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ------- UI helpers ------- */
function Card({ title, desc, children }) {
  return (
    <div className="settings-card">
      <div className="settings-card-head">
        <h2 className="settings-h2">{title}</h2>
        <p className="settings-desc">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="settings-row">
      <div className="settings-row-label">{label}</div>
      <div className="settings-row-field">{children}</div>
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }) {
  return (
    <div className="settings-toggle">
      <div className="settings-toggle-text">
        <div className="settings-toggle-label">{label}</div>
        <div className="settings-toggle-desc">{desc}</div>
      </div>

      <label className="settings-toggle-control">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      </label>
    </div>
  );
}
