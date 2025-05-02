let userRole;

if (typeof window !== "undefined") {
  userRole = window.localStorage.getItem("userRole");
}

export const isAdmin = () => {
  return userRole === "admin";
};

export const isClient = () => {
  return userRole === "client";
};
