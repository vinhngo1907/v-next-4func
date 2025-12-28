import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }

  return color;
}

export function normalizeUsername(data: {
  username?: string, first_name?: string, last_name?: string
}) {
  if (data.username) {
    return data.username.toLowerCase().trim();
  }

  const firstName = data.first_name?.toLowerCase().trim() ?? "";
  const lastName = data.last_name?.toLowerCase().trim() ?? "";

  return `${firstName}${lastName}`;
};

type UsernameInput = {
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export const getNormalizedUsername = (user: UsernameInput) => {
  if (user.username) {
    return user.username.toLowerCase().trim();
  }

  const firstName = user.firstName?.toLowerCase().trim() ?? "";
  const lastName = user.lastName?.toLowerCase().trim() ?? "";

  return `${firstName}${lastName}`;
};
