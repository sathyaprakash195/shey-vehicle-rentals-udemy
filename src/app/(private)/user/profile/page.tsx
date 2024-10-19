import PageTitle from "@/components/page-title";
import { getDateTimeFormat } from "@/helpers/date-time-formats";
import { IUser } from "@/interfaces";
import { getCurrentUserDataFromMongoDB } from "@/server-actions/users";
import { Button } from "antd";
import React from "react";

async function UserProfilePage() {
  const { success, data }: any = await getCurrentUserDataFromMongoDB();
  const userData: IUser = data;

  const renderUserProperty = (label: string, value: string) => {
    return (
      <div className="text-sm flex flex-col">
        <span className="font-bold">{label}</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div>
      <PageTitle title="Profile" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-7">
        {renderUserProperty("Name: ", userData.name)}
        {renderUserProperty("Email: ", userData.email)}
        {renderUserProperty("User ID: ", userData._id)}
        {renderUserProperty("Clerk User ID: ", userData.clerkUserId)}
        {renderUserProperty("Role: ", userData.isAdmin ? "Admin" : "User")}
        {renderUserProperty(
          "Joined On: ",
          getDateTimeFormat(userData.createdAt)
        )}
      </div>

      <div className="mt-7 flex justify-end gap-5">
        <Button>Cancel</Button>
        <Button type="primary">Edit user details</Button>
      </div>
    </div>
  );
}

export default UserProfilePage;
