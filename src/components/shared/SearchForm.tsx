"use client";

import type { SearchFormProps } from "@/types/component.types";
import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

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
      onSubmit={(e) => {
        e.preventDefault();
        typeof onSearch === "function" && onSearch(input);
      }}
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
