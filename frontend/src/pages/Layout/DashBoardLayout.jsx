import React from "react";

import SidebarDashBoard from "../../components/sidebar/SidebarDashboard/SidebarDashBoard.jsx";

const DashBoardLayout = ({ children }) => {
  return (
    <div>
      <SidebarDashBoard />
      {children}
    </div>
  );
};

export default DashBoardLayout;
