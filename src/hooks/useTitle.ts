import { useEffect } from "react";

const baseTitle = "Rail CMS";

export const useTitle = (title?: string) => {
  useEffect(() => {
    document.title =
      title && typeof title === "string" && title.trim().length !== 0
        ? `${baseTitle} | ${title}`
        : baseTitle;
  }, [title]);
};
