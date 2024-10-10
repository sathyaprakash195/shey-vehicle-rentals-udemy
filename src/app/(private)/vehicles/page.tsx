"use client";
import { IUsersGlobalStore, usersGlobalStore } from "@/store/users-store";
import React from "react";

function VehiclesPage() {
  const { loggedinUserData } = usersGlobalStore() as IUsersGlobalStore;
  return (
    <div>
      <h1>Vehicles Page</h1>
      <h2>Welcome {loggedinUserData?.name}</h2>
    </div>
  );
}

export default VehiclesPage;
