"use server";

import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUserDataFromMongoDB = async () => {
  try {
    // check if user data exists in MongoDB , if yes return the user data
    const clerkUserData = await currentUser();
    const mongoUser = await UserModel.findOne({
      clerkUserId: clerkUserData?.id,
    });
    if (mongoUser) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(mongoUser)),
      };
    }

    // else create a new user data in MongoDB and return the user data
    const newUser = {
      name: clerkUserData?.firstName + " " + clerkUserData?.lastName,
      email: clerkUserData?.emailAddresses[0].emailAddress,
      profilePic: clerkUserData?.imageUrl,
      isActive: true,
      isAdmin: false,
      clerkUserId: clerkUserData?.id,
    };

    const user = new UserModel(newUser);
    await user.save();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
