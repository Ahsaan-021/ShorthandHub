import { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In - ShorthandHub",
  description: "Sign in to your ShorthandHub account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Sign in to continue learning shorthand</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}