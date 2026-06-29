import ProfileCard from "@/app/(main)/profile/_components/profile-card";
import ProfileLogout from "@/app/(main)/profile/_components/profile-logout";

export default function ProfileSettings({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <section className="grid gap-4">
      <ProfileCard name={name} email={email} />
      <ProfileLogout />
    </section>
  );
}
