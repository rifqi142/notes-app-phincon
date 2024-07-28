import { Notes } from "@/type";

const URL = "http://localhost:3000/api/notes";

const getNotes = async (): Promise<Notes[]> => {
  const data = await fetch(URL);

  if (!data.ok) {
    throw new Error(data.statusText);
  }

  return data.json();
};

export default getNotes;
