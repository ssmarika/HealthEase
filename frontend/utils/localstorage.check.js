export const localStorageCheck = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
};
