"use client";

import React, { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";

interface InputSearchProps {
  onSearch: (keyword: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="w-96">
      <Input
        placeholder="Search your notes by title"
        onChange={handleChange}
        value={keyword}
      />
    </div>
  );
};

export default InputSearch;
