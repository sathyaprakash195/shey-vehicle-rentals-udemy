"use client";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IUser } from "@/interfaces";
import { updateUserRole } from "@/server-actions/users";
import { message, Table } from "antd";
import React from "react";

function UsersTable({ users }: { users: IUser[] }) {
  const [loading, setLoading] = React.useState(false);
  const userRoleUpdateHandler = async (userId: string, role: string) => {
    try {
      setLoading(true);
      const { success } = await updateUserRole(userId, role);
      if (success) {
        message.success("User role updated successfully");
      } else {
        message.error("Failed to update user role");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string, record: IUser) => {
        const userRole = record.isAdmin ? "admin" : "user";
        return (
          <select
            value={userRole}
            onChange={(e) => userRoleUpdateHandler(record._id, e.target.value)}
            className="border border-gray-500 rounded-sm p-1"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        );
      },
    },
  ];
  return (
    <Table
      dataSource={users}
      columns={columns}
      loading={loading}
      rowKey="_id"
    />
  );
}

export default UsersTable;
