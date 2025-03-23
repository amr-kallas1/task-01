
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeAllFirstLetter(string: string) {
  return string
    .split(" ")
    .map((string) => capitalizeFirstLetter(string))
    .join(" ");
}


