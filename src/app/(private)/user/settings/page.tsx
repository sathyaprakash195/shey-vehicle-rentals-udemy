import PageTitle from "@/components/page-title";
import { Alert } from "antd";
import React from "react";

function UserSettingsPage() {
  return (
    <div>
      <PageTitle title="Settings" />
      <Alert
        className="mt-7"
        message="Coming soon"
        description="This page is under development. Please check back later."
        type="info"
        showIcon
      />
    </div>
  );
}

export default UserSettingsPage;
