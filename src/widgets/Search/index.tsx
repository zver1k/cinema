import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Input } from "@/shared/ui/input";

function Search() {
  return (
    <Field>
      <ButtonGroup>
        <Input
          className="bg-card"
          id="input-button-group"
          placeholder="Поиск..."
        />
        <Button variant="outline">Поиск</Button>
      </ButtonGroup>
    </Field>
  );
}

export default Search;
