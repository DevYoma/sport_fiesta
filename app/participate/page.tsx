"use client";

import { ChangeEvent, useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import supabase from "@/config/supabaseConfig";

const page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const [formError, setFormError] = useState("")

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
  };

  // console.log(gender);

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

  // console.log(selectedSports);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  // console.log(team);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // alert("Form submitted")

    const submittedData = {
      name, 
      email, 
      team, 
      gender, 
      selectedSports, 
      // file: file?.name
    }
    console.log(submittedData);

    const { data, error } = await supabase
      .from('participants')
      .insert([{ email, gender, name, team, selectedSports }])
      .select()

      if(error){
        console.log(error.message);
      }

      if(data){
        console.log("Data submitted to Supabase");
      }
  }

  return (
    <div className="flex min-h-screen flex-col items-center pb-20">
      <Header />
      <h3 className="text-2xl mb-8">Participation Page</h3>

      <form onSubmit={handleSubmit} className="w-2/4 mx-auto flex flex-col gap-6">
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
            Image
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

          {file ? <p>Selected file: {file.name}</p> : 'No file selected'}
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
          <div className="flex flex-col flex-wrap h-[450px]">
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
