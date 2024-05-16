"use client";

import type { Webflow } from "webflow-api";

interface ButtonThingProps {
  page?: Webflow.Page;
  setPage: Function;
}

export default function ButtonThing({ page, setPage }: ButtonThingProps) {
  return (
    <button
      onClick={async () => {
        const res = await fetch("/api/ipsum", {
          method: "POST",
          body: JSON.stringify({
            translation: page?.title,
            pageId: page?.id,
          }),
        });
        const resJson = await res.json();
        console.log("ALAS!", resJson.page.title);
        setPage(resJson.page);
      }}
    >
      Update Page Title
    </button>
  );
}
