"use client";
import React, { useEffect, useState } from "react";
import { Notes } from "@/type";
import getNotes from "@/actions/get-notes";
import NoteList from "./note-list";

interface NoteContainerProps {
  searchKeyword: string;
}

const NoteContainer: React.FC<NoteContainerProps> = ({ searchKeyword }) => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Notes[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await getNotes();
      setNotes(notesData);
      setFilteredNotes(notesData);
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
