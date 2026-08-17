const slugifyWingName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getWingMembersPath = (wingName: string) =>
  `/members/${slugifyWingName(wingName)}`;
