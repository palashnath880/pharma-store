"use client";

import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

type SearchFormProps = {
  placeholder: string;
  value?: string | undefined;
  onSearch?: (val: string) => void;
};

export default function SearchForm({
  placeholder,
  value,
  onSearch,
}: SearchFormProps) {
  // states
  const [input, setInput] = useState<string>("");

  // set init value
  useEffect(() => {
    if (value && typeof value === "string") {
      setInput(value);
    }
  }, [value]);

  return (
    <form
      className="max-w-[300px]"
      onSubmit={() => typeof onSearch === "function" && onSearch(input)}
    >
      <TextField
        fullWidth
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        InputProps={{
          endAdornment: input?.length > 0 && (
            <InputAdornment position="end">
              <IconButton type="submit">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
