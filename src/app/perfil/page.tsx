import { auth } from "@/auth";
import PerfilClient from "./PerfilClient";
import { redirect } from "next/navigation";

export default async function PerfilPage() {
  const session = await auth();

  // O middleware já deve proteger esta rota, mas garantimos aqui também
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return <PerfilClient user={session.user} />;
}
