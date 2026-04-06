import { LoginForm } from "@/components/auth/LoginForm";
import { Header } from "@/components/layout/Header";

// ログインページ
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header user={false} />
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        <LoginForm />
      </div>
    </div>
  );
}
