import { IUser } from "@/interfaces";
import { create } from "zustand";

export const usersGlobalStore = create((set) => ({
  loggedinUserData: null,
  setLoggedinUserData: (data: IUser) => set({ loggedinUserData: data }),
}));



export interface IUsersGlobalStore {
  loggedinUserData: IUser | null;
  setLoggedinUserData: (data: IUser) => void;
}
