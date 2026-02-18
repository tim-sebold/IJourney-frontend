import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Chrome, KeyRound } from "lucide-react";


export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
}

export const images = import.meta.glob('../assets/image/character-strengths/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const control_scroll = (direct: string) => {
  if (direct === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export const providerMeta = (providerId: string) => {
  switch (providerId) {
    case "google.com":
      return { label: "Google", Icon: Chrome };
    case "password":
      return { label: "Email & Password", Icon: KeyRound };
    default:
      return { label: providerId, Icon: KeyRound };
  }
}

export const extractAvatarBasedonName = (name: string) => {
  if (!name) return "";
  const words = name.split(" ");
  var AvatarSymbol = "";

  for (let i = 0; i < words.length; i++) {
    AvatarSymbol += words[i][0];
  }

  return AvatarSymbol;
}
