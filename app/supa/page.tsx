import supabase from '@/config/supabaseConfig';

export default async function Notes(){
    const { data: notes, error } = await supabase.from("notes").select()

    return (
      <div>
        {notes?.map((note: Note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
          </li>
        ))}
      </div>
    );
}
  
