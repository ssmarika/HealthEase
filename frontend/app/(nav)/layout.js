import ResponsiveAppBar from "@/components/Appbar";
import SnackbarMessage from "@/components/SnackbarMessage";
import { Snackbar } from "@mui/material";

export const metadata = {
  title: "HealthEase",
  description: "HealthEase, an online platform for medical services",
};

export default function AuthLayout({ children }) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <ResponsiveAppBar />
      {children}
      <SnackbarMessage />
    </div>
  );
}
