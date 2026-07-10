import { Metadata } from "next";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Create Account - ShorthandHub",
  description: "Create your ShorthandHub account to start learning shorthand",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Create Account</h1>
          <p className="text-muted-foreground text-sm">Start your shorthand learning journey</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}