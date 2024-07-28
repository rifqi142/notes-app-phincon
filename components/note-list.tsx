import { Notes } from "@/type";
import React, { useEffect } from "react";
import NotesCard from "./note-card";
import Image from "next/image";

interface NotesListProps {
  items: Notes[];
  onDelete: (noteId: string) => void;
}

const NoteList: React.FC<NotesListProps> = ({ items = [], onDelete }) => {
  return (
    <div className="space-y-4 mx-4 lg:mx-10 my-4 lg:my-10">
      <h1 className="text-2xl font-bold">Rifqi Notes</h1>
      <div className="flex flex-row flex-wrap gap-3">
        {items.length > 0 ? (
          items.map((item) => (
            <NotesCard key={item.id} data={item} onDelete={onDelete} />
          ))
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <Image
              src="/assets/not-found.svg"
              alt="empty"
              width={200}
              height={200}
            />
            <h1 className="text-2xl font-bold">Notes tidak ditemukan</h1>
            <p>
              Notes tidak ditemukan, silahkan tambahkan notes baru dengan klik
              tombol tambah notes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteList;
