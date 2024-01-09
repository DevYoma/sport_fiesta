'use client'

import Link from "next/link";
import { useContext } from "react";
import { FormDataContext } from "@/context/FormDataContext";

type User = {
  id: number;
  email: string;
  gender: string;
  name: string;
  team: string;
  selectedSports: string[];
};
// TODO: save context data here to local storage / think of any other fix
export const page = () => {
  const { formData } = useContext(FormDataContext) // save this one to local storage
  // console.log(formData);
  return (
    <div>
      <h3>Your data has been registered 🚀</h3>
      <br />
      <p className="">Your Unique ID is <code className="text-blue-500 cursor pointer">/{formData?.team}</code></p>
      <Link href={"/"} className="underline">Click here to go to Home Page</Link>
    </div>
  );
};

export default page;
