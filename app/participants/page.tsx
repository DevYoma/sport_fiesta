import supabase from "@/config/supabaseConfig";
import Link from "next/link";

export default async function Participants(){
  const { data: participants, error } = await supabase
    .from("participants")
    .select();

    if(error){
      return (
        <p>Failed to fetch Data</p>
      )
    }

  return (
    <div>
      <h1 className="text-center text-2xl">Participants Page</h1>
      <Link href={'/'} className="text-blue-400 underline text-center">Go to Home Page</Link>
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
            {participant?.file && (
              <img src={participant?.file} alt="pic-of-user" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

