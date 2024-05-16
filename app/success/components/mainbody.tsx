"use client";

import { useState, useEffect } from "react";
import type { Webflow } from "webflow-api";
import Title from "./title";
import ButtonThing from "./buttonthing";

interface MainBodyProps {
  options: Webflow.Page[];
}

export default function MainBody({ options }: MainBodyProps) {
  const [page, setPage] = useState<Webflow.Page>();

  useEffect(() => {
    if (!page && options.length > 0) {
      setPage(options[0]);
    }
  }, [options, page, setPage]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "8px",
        height: "100%",
      }}
    >
      <Title title={page?.title} />
      <select
        onChange={(e) => {
          const page = options.find((option) => option.id === e.target.value);
          setPage(page);
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
      <ButtonThing page={page} setPage={setPage} />
    </div>
  );
}
