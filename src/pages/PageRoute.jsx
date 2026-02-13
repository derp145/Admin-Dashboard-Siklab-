import { Routes, Route, Navigate } from "react-router-dom";
import CommonLayout from "../common/CommonLayout";

import Dashboard from "./Dashboard";
import UserInsights from "./UserInsights";
import PlayerEngagement from "./PlayerEngagement";
import PlatformStats from "./PlatformStats";

const PageRoute = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="userinsights" element={<UserInsights />} />
        <Route path="playerengagement" element={<PlayerEngagement />} />
        <Route path="platformstats" element={<PlatformStats />} />
      </Route>

      {/* Catch unknown dashboard routes */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default PageRoute;