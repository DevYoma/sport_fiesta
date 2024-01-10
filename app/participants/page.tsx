// 'use client'

// import supabase from "@/config/supabaseConfig";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

// FIXME: make the call more efficient
 async function getAllUsersFromFB(){
   const querySnapshot = await getDocs(collection(db, "participants"));
   let data: User[] | any = [];
   querySnapshot.forEach((doc) => {
     data.push({
       id: doc.id,
       ...doc.data(),
     });
   });
   return data;
 };

export default async function Page() {

  const userData = await getAllUsersFromFB();
  console.log(userData);

  if(userData.length === 0) {
    return (
      <div>
        <h1 className="text-center text-2xl">Participants Page</h1>
        <Link href={"/"} className="text-blue-400 underline text-center">
          Go to Home Page
        </Link>
        <div className="mt-8">
          <p>No participants yet</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-center text-2xl">Participants Page</h1>
      <Link href={"/"} className="text-blue-400 underline text-center">
        Go to Home Page
      </Link>
      <div className="mt-8">
        {userData?.map((participant: User) => (
          <div className="border border-red-500 mb-4" key={participant.id}>
            <h3>{participant.name}</h3>
            <p>{participant.email}</p>
            <p>{participant.gender}</p>
            <p>{participant.team}</p>
            <div>
              {participant.selectedSports.map((sport: any) => (
                <li>{sport}</li>
              ))}
            </div>
            {participant?.url && (
              <img src={participant?.url} alt="pic-of-user" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}