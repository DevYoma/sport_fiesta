"use client";

// import supabase from "@/config/supabaseConfig";
import { db } from "@/config/firebase";
import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Page() {
  const [participants, setParticipants] = useState<User[]>([]);

  useEffect(() => {
    const firebaseUserData = query(collection(db, "participants"));
    const unsubscribe = onSnapshot(firebaseUserData, (querySnapshot) => {
      let itemsArr: User[] | any = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setParticipants(itemsArr);

      return () => unsubscribe();
    });
  }, []);

  if(participants.length === 0) return(
    <div>
      <h1 className="text-center text-2xl">Participants Page</h1>
      <Link href={"/"} className="text-blue-400 underline text-center">
        Go to Home Page
      </Link>
      <div className="mt-8">
        <h1 className="text-center text-2xl">No Participants Yet</h1>
      </div>
    </div>
  )

  return (
    <div>
      <h1 className="text-center text-2xl">Participants Page</h1>
      <Link href={"/"} className="text-blue-400 underline text-center">
        Go to Home Page
      </Link>
      <div className="mt-8">
        {participants?.map((participant: User) => (
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
