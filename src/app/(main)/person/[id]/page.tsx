import { getPersonById } from "@/shared/api/cast";
import Filmography from "@/app/(main)/person/[id]/_components/filmography";
import BackButton from "@/shared/ui/back-button";
import PersonInfo from "@/app/(main)/person/[id]/_components/info";

async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = await getPersonById(id);

  return (
    <div className="flex flex-col gap-4">
      <div className="min-w-0">
        <BackButton />
        <PersonInfo person={person} />
      </div>
      <Filmography films={person.films} />
    </div>
  );
}

export default PersonPage;
