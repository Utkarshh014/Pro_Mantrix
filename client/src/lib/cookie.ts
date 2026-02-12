export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; max-age=0; path=/`;
};
