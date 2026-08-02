import AppRouter from "./router/AppRouter";
import Login from "./pages/Login/Login";
import { AuthProvider, useAuth } from "./auth/Auth";

function AppContent() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
<p className="text-3xl font-bold text-red-600">
  VERSION NUEVA
</p>
      </div>
    );
  }

  return session ? <AppRouter /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}