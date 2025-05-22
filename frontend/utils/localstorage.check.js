export const localStorageCheck = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
  }
  return false;
};
