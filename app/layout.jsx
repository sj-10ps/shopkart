
import AuthProvider from "@/components/AuthProvider";
import "../assets/css/globals.css";
import { ReduxProvider } from "@/Providers/store";
import { ToastContainer } from "react-toastify";




export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <AuthProvider>
         <ReduxProvider>
          <ToastContainer/>
          {children}
          </ReduxProvider>
          

        </AuthProvider>
      </body>
    </html>
  );
}
