// src/data/mockData.js

// ---------------- DASHBOARD KPI / OVERVIEW ----------------
export const DASHBOARD_KPI = [
  { title: "Total Users", value: "1,024", trend: "+8% this week", color: "#6366f1" },
  { title: "Daily Active Users", value: "512", trend: "+4.3%", color: "#10b981" },
  { title: "Total Hours Played", value: "3,450", trend: "+12%", color: "#f59e0b" },
];

// ---------------- OVERVIEW / EXEC SUMMARY ----------------
export const OVERVIEW_STATS = {
  totalPlayers: 1024,
  newPlayersThisWeek: 86,
  activePlayersToday: 512,
  avgSessionLength: 28, // minutes
  totalHoursPlayed: 3450,
};

export const ALERTS = [
  { id: 1, type: "warning", message: "Crash rate increased on Android v1.0.4" },
  { id: 2, type: "info", message: "Chapter 3 has a high quit rate (35%)" },
];


// ---------------- USER INSIGHTS ----------------
export const USER_LIST = [
  { id: 1, age: "6-12", grade: "grade1", gender: "male" },
  { id: 2, age: "6-12", grade: "grade2", gender: "female" },
  { id: 3, age: "13-16", grade: "grade3", gender: "female" },
  { id: 4, age: "16-19", grade: "grade3", gender: "male" },
  { id: 5, age: "6-12", grade: "kinder", gender: "female" },
  // ... more rows if needed
];

// ---------------- PLAYER INSIGHTS (EXPANDED) ----------------

export const NEW_VS_RETURNING = [
  { type: "New Players", value: 320 },
  { type: "Returning Players", value: 704 },
];

export const AVG_PLAYTIME_PER_STUDENT = [
  { grade: "kinder", minutes: 18 },
  { grade: "grade1", minutes: 22 },
  { grade: "grade2", minutes: 26 },
  { grade: "grade3", minutes: 30 },
];

export const COMPLETION_BY_GRADE = [
  { grade: "kinder", completion: 55 },
  { grade: "grade1", completion: 65 },
  { grade: "grade2", completion: 72 },
  { grade: "grade3", completion: 80 },
];

// ---------------- PLAYER ENGAGEMENT ----------------
export const DAILY_ACTIVE_USERS = [
  { day: "Mon", users: 400 }, { day: "Tue", users: 520 }, { day: "Wed", users: 610 },
  { day: "Thu", users: 480 }, { day: "Fri", users: 730 }, { day: "Sat", users: 680 }, { day: "Sun", users: 750 },
];

export const WEEKLY_PLAYTIME = [
  { week: "Week 1", hours: 520 }, { week: "Week 2", hours: 680 },
  { week: "Week 3", hours: 750 }, { week: "Week 4", hours: 900 },
];

export const TOP_PLAYERS = [
  { userId: 1, playerName: "PlayerOne", hours: 120, retention1: 80, retention7: 50, avgSession: 30 },
  { userId: 2, playerName: "PlayerTwo", hours: 115, retention1: 75, retention7: 45, avgSession: 28 },
  { userId: 3, playerName: "PlayerThree", hours: 110, retention1: 70, retention7: 40, avgSession: 25 },
  // ...
];


export const REGIONAL_COMPLETION = [
  { id: 1, region: "Luzon (Intramuros)", active: "5,200", progress: 85 },
  { id: 2, region: "Visayas (Mactan)", active: "3,100", progress: 62 },
  { id: 3, region: "Mindanao (Dapitan)", active: "1,850", progress: 40 },
];

// ---------------- PLAYER ENGAGEMENT (EXPANDED) ----------------

export const WEEKLY_ACTIVE_USERS = [
  { week: "Week 1", users: 820 },
  { week: "Week 2", users: 900 },
  { week: "Week 3", users: 960 },
  { week: "Week 4", users: 1020 },
];

export const AVG_SESSION_LENGTH = [
  { day: "Mon", minutes: 24 },
  { day: "Tue", minutes: 26 },
  { day: "Wed", minutes: 28 },
  { day: "Thu", minutes: 25 },
  { day: "Fri", minutes: 30 },
  { day: "Sat", minutes: 32 },
  { day: "Sun", minutes: 34 },
];

export const SESSIONS_PER_PLAYER = [
  { range: "1-2", users: 220 },
  { range: "3-5", users: 510 },
  { range: "6+", users: 294 },
];

// ---------------- PLATFORM ----------------

export const PLATFORM_KPI = [
  { title: "Total Downloads", value: "5,420", trend: "+15%", color: "#6366f1" },
  { title: "Active Installs", value: "3,102", trend: "+10%", color: "#10b981" },
  { title: "Uninstalls", value: "842", trend: "-2%", color: "#ef4444" },
  { title: "Avg. Store Rating", value: "4.8", trend: "0.0", color: "#f59e0b" },
];

export const INSTALL_CHART_DATA = [
  { month: "Jan", ios: 400, android: 600, uninstalls: 120 },
  { month: "Feb", ios: 520, android: 750, uninstalls: 150 },
  { month: "Mar", ios: 610, android: 900, uninstalls: 180 },
  { month: "Apr", ios: 750, android: 1100, uninstalls: 210 },
];

export const STORE_DISTRIBUTION = [
  { name: "Android (Google Play)", value: 65, color: "#3ddc84" },
  { name: "iOS (App Store)", value: 35, color: "#555555" },
];

export const PLATFORM_DETAILS = [
  { platform: "Android", version: "v1.0.4", crashes: "0.2%", rating: 4.7 },
  { platform: "iOS", version: "v1.0.3", crashes: "0.1%", rating: 4.9 },
];

// --------- EXPANSIONS (for Platform page) ---------

export const VERSION_ADOPTION = [
  { version: "v1.0.4", users: 2200 },
  { version: "v1.0.3", users: 700 },
  { version: "v1.0.2", users: 200 },
];

export const RETENTION_BY_PLATFORM = [
  { day: "Day 1", android: 70, ios: 75 },
  { day: "Day 7", android: 42, ios: 48 },
  { day: "Day 30", android: 25, ios: 30 },
];

export const HOURS_BY_PLATFORM = [
  { platform: "Android", hours: 2100 },
  { platform: "iOS", hours: 1350 },
];

export const CRASH_TREND = [
  { month: "Jan", android: 0.3, ios: 0.2 },
  { month: "Feb", android: 0.25, ios: 0.15 },
  { month: "Mar", android: 0.2, ios: 0.1 },
  { month: "Apr", android: 0.18, ios: 0.09 },
];

export const PLATFORM_BY_REGION = [
  { region: "Luzon", android: 1800, ios: 900 },
  { region: "Visayas", android: 900, ios: 500 },
  { region: "Mindanao", android: 700, ios: 300 },
];

// ---------------- PLATFORM STATUS (MOBILE) ----------------

export const DEVICE_TYPES = [
  { type: "Low-end Phones", users: 1200 },
  { type: "Mid-range Phones", users: 1400 },
  { type: "High-end Phones", users: 500 },
];

export const OS_DISTRIBUTION = [
  { os: "Android", value: 65 },
  { os: "iOS", value: 35 },
];

export const INSTALLS_VS_UNINSTALLS = [
  { month: "Jan", installs: 1000, uninstalls: 120 },
  { month: "Feb", installs: 1270, uninstalls: 150 },
  { month: "Mar", installs: 1510, uninstalls: 180 },
  { month: "Apr", installs: 1850, uninstalls: 210 },
];
