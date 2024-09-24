import AuthLayout from "./auth/layout";
import Signup from "./auth/signup/page";

export default function Home() {
  return (
    <AuthLayout>
      <Signup />
    </AuthLayout>
  );
}
