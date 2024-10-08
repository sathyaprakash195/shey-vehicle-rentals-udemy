import React from "react";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

async function VehiclesPage() {
  const userData = await currentUser();
  console.log(userData);
  return (
    <div className="p-10">
      <h1>Vehicles</h1>
      <UserButton />

      <h1>User ID : {userData?.id}</h1>

      <h1>User name : {userData?.firstName + " " + userData?.lastName}</h1>

      <h1>Email address : {userData?.emailAddresses[0].emailAddress}</h1>
    </div>
  );
}

export default VehiclesPage;