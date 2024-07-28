"use client";
import React, { useEffect, useState } from "react";
import { Notes } from "@/type";
import NoteList from "./note-list";
import axios from "axios";

interface NoteContainerProps {
  searchKeyword: string;
}

const NoteContainer: React.FC<NoteContainerProps> = ({ searchKeyword }) => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Notes[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("api/notes");
        console.log(response.data);
        setNotes(response.data);
        setFilteredNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes", error);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const filteredResult = notes.filter((note) =>
        note.ntitle.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredNotes(filteredResult);
    }
  }, [searchKeyword, notes]);

  const handleDeleteNote = (noteId: string) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id.toString() !== noteId)
    );
    setFilteredNotes((prevNotes) =>
      prevNotes.filter((note) => note.id.toString() !== noteId)
    );
  };

  return <NoteList items={filteredNotes} onDelete={handleDeleteNote} />;
};

export default NoteContainer;
