type User = {
    id: number | string;
    name: string;
    email: string;
    team: string;
    gender: "male" | "female"; 
    selectedSports: string[];
    file: string;
    url: string;
}

 type Note = {
   id: number;
   title: string;
 };