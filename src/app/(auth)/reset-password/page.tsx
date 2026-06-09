import SidebarHeader from "@/widgets/Sidebar/SidebarHeader";
import AuthSection from "@/widgets/AuthSection";
import ResetPasswordForm from "@/app/(auth)/reset-password/_components/reset-password-form";

export const dynamic = "force-dynamic";

async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="flex w-full items-center justify-center px-4 py-4 lg:w-1/2">
        <div className="w-full max-w-md">
          <SidebarHeader />

          <h1 className="text-3xl font-bold tracking-tight">Сменить пароль</h1>
          <ResetPasswordForm token={token} />
        </div>
      </div>

      <AuthSection />
    </div>
  );
}

export default ResetPage;
