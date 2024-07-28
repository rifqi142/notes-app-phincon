import { Notes } from "@/type";

const URL = `${process.env.PUBLIC_API_URL}`;
// const URL = "http://localhost:3000/api/notes";

const getNotes = async (): Promise<Notes[]> => {
  const data = await fetch(URL);

  console.log(data);

  return data.json();
};

export default getNotes;
