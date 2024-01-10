"use client";

import { ChangeEvent, useContext, useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import supabase from "@/config/supabaseConfig";
import { useRouter } from "next/navigation";
import { FormDataContext } from "@/context/FormDataContext";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

const page = () => {
  // context
  const { formData, setFormData } = useContext(FormDataContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  
  const [supabaseImgUrl, setSupabaseImgUrl] = useState<string>("")

  const router = useRouter();

  const userCollection = collection(db, "participants");

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
  };

  // console.log(gender);
  // console.log(formData);

  const sportsList = [
    "Football ⚽",
    "Basketball 🏀",
    "Table Tennis 🏓",
    "VolleyBall 🏐",
    "Chess ♟",
    "Scrabble 🧩",
    "Ludo 🎲",
    "AYO Olopon",
    "Snake and Ladder 🐍🪜",
    "Egg Race 🥚🏃‍♂️",
    "Filling the Bottle 🧴🏃‍♂️",
    "WHOT 🃏",
    "Eating Competition 🍚",
    "FIFA/PES 🎮",
    "HIGH Jump 🏃‍♂️",
    "LONG Jump 🏃‍♂️",
    "Track 100m 🏃‍♂️",
    "Track 200m 🏃‍♂️",
    "Track 400m 🏃‍♂️",
    "Track 1500m 🏃‍♂️",
    "Relay 4x400 🏃‍♂️",
    "Relay 4x100 🏃‍♂️",

    // Add more sports as needed
  ];

  const handleCheckboxChange = (sport: string) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(
        selectedSports.filter((selectedSport) => selectedSport !== sport)
      );
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const upLoadFile = async (file: File | any) => {
    const { data, error } = await supabase.storage
      .from("participant-images")
      .upload(`/${file.name}`, file);

    if (error) {
      console.log("Error uploading file: ", error.message);
    } else {
      console.log("File uploaded successfully: ", data);
      const link = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/participant-images/${data.path}`;
      return link;
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // upload file to supabase storage
    if (file === null) {
      return
      // const imageUrl = await upLoadFile(file) as string;
      // console.log(imageUrl);
      // setSupabaseImgUrl(imageUrl);
    }

    const submittedData = {
      name: name,
      email: email,
      team: team,
      gender: gender,
      selectedSports: selectedSports,
      file: file?.name,
      url: await upLoadFile(file),
    };

    try {
      //TODO: check for existing emails
      const checkDuplicateEmails = async () => {
        const existingUserEmail = userCollection;
      };

      const docRef = await addDoc(collection(db, "participants"), submittedData);

      console.log("Data submitted to Firebase with id: " + docRef.id);
      setFormData(submittedData);
      router.push("/registered");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center pb-20">
      <Header />
      <h3 className="text-2xl mb-8 text-center">Participation Page</h3>

      <form
        onSubmit={handleSubmit}
        className="w-[90%] border border-green-400 md:w-2/4 md:border md:border-red-500 mx-auto flex flex-col gap-6"
      >
        <div className="w-full flex gap-4 items-center">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Emore Ogheneyoma Lawrence"
            className="w-full rounded-md px-5 py-1 text-black"
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="w-full flex gap-4 items-center">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            required
            type="text"
            name="email"
            id="email"
            placeholder="olemore@student.oauife.edu.ng"
            className="w-full rounded-md px-5 py-1 text-black"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="w-full flex gap-4 items-center">
          <div className="font-semibold">Gender</div>

          <div className="flex items-center">
            <input
              required
              type="radio"
              id="male"
              name="gender"
              value="male"
              className="w-full rounded-md px-5 py-1 text-black"
              checked={gender === "male"}
              onChange={() => handleGenderChange("male")}
            />
            <label htmlFor="male">Male</label>
          </div>

          <div className="flex items-center">
            <input
              required
              type="radio"
              id="female"
              name="gender"
              value="female"
              className="w-full rounded-md px-5 py-1 text-black"
              checked={gender === "female"}
              onChange={() => handleGenderChange("female")}
            />

            <label htmlFor="female">Female</label>
          </div>
        </div>

        <div className="w-full flex gap-4 items-center">
          <label htmlFor="image" className="font-semibold">
            Image(Less than 5Mb)
          </label>
          <input
            required
            type="file"
            accept=".jpg, .jpeg, .png"
            name="image"
            id="image"
            className="rounded-md px-5 py-1 text-black"
            onChange={handleFileChange}
          />

          {file ? <p>Selected file: {file.name}</p> : "No file selected"}
        </div>

        <div className="w-full flex gap-4 items-center">
          <label htmlFor="team" className="font-semibold">
            Team
          </label>
          <select
            name="team"
            id="team"
            className="text-black w-full rounded-md px-5 py-1"
            onChange={(event) => setTeam(event.target.value)}
            required
          >
            <option value="" disabled selected>
              Select your team
            </option>
            <option value="bethany">Bethany</option>
            <option value="capernaum">Capernaum</option>
            <option value="galilee">Galilee</option>
            <option value="jericho">Jericho</option>
            <option value="jordan">Jordan</option>
            <option value="nile">Nile</option>
          </select>
        </div>

        <div className="w-full">
          <div className="font-semibold">Pick Sport </div> <br />
          <div className="flex flex-col flex-wrap lg:h-[450px]">
            {sportsList.map((sport) => (
              <>
                <div key={sport} className="">
                  <input
                    // required
                    type="checkbox"
                    id={sport}
                    value={sport}
                    checked={selectedSports.includes(sport)}
                    onChange={() => handleCheckboxChange(sport)}
                    className=""
                  />
                  <label htmlFor={sport}>{sport}</label>
                </div>
                <br />
              </>
            ))}
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default page;
