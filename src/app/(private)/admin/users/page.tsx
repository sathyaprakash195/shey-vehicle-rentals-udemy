import PageTitle from "@/components/page-title";
import ServerComponentsSpinner from "@/components/server-components-spinner";
import { getAllUsers } from "@/server-actions/users";
import { Alert } from "antd";
import React, { Suspense } from "react";
import UsersTable from "./_components/users-table";

async function AdminUsersList() {
  const { success, data } = await getAllUsers();
  if (!success) {
    return <Alert message="Failed to fetch users" showIcon type="error" />;
  }
  return (
    <div>
      <PageTitle title="Users (Access Management)" />
      <UsersTable users={data} />
    </div>
  );
}

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<ServerComponentsSpinner />}>
      <AdminUsersList />
    </Suspense>
  );
}
