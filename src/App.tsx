import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./auth/Auth";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}