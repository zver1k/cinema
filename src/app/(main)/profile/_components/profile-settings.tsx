import ProfileCard from "@/app/(main)/profile/_components/profile-card";
import ProfilePrivate from "@/app/(main)/profile/_components/profile-private";

export default function ProfileSettings({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <ProfileCard name={name} email={email} />
      <ProfilePrivate />
    </section>
  );
}
