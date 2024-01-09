import supabase from "@/config/supabaseConfig";

export const page = async () => {
  const { data: participants, error } = await supabase
    .from("participants")
    .select();
  return (
    <div>
      {participants?.map((participant: User) => (
        <div className="border border-red-500 last-mb-4" key={participant.id}>
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
  );
};

export default page;
