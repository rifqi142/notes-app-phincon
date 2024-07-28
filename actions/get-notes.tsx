import { Notes } from "@/type";

const URL = `${process.env.PUBLIC_API_URL}/notes`;

const getNotes = async (): Promise<Notes[]> => {
  const data = await fetch(URL);

  if (!data.ok) {
    throw new Error(data.statusText);
  }

  return data.json();
};

export default getNotes;
