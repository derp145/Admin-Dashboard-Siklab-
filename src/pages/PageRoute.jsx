import { Routes, Route } from "react-router-dom";
import CommonLayout from "../common/CommonLayout";
import DashboardHome from "./Dashboard";
import Profile from "./Profile";
import UserInsights from "./UserInsights";
import PlayerEngagement from "./PlayerEngagement";
import PlatformStats from "./PlatformStats";
import Settings from "./Settings";

const PageRoute = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />}>
        <Route path="" element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="userinsights" element={<UserInsights />} />
        <Route path="playerengagement" element={<PlayerEngagement />} />
        <Route path="platformstats" element={<PlatformStats />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default PageRoute;
