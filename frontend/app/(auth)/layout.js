export const metadata = {
  title: "Authentication",
  description: "E-pharma, an online platform for medical services",
};

export default function AuthLayout({ children }) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {children}
    </div>
  );
}
