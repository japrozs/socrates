export const getFirstName = (name: string) =>
    name
        .trim()
        .split(" ")[0]
        .toLowerCase()
        .replace(/^./, (c) => c.toUpperCase());
