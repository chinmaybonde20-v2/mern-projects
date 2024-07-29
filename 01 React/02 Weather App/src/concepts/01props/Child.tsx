import { Person } from "./Parent";
interface Props {
  states: string;
  array: string[];
  object: Person;
  functions: () => void;
}
export const Child: React.FC<Props> = ({
  states,
  array,
  object,
  functions,
}) => {
  return (
    <div>
      <h3>Name in child: {states}</h3>
      <h3>Name in child: {JSON.stringify(array)}</h3>
      <h3>Object in child: {JSON.stringify(object)}</h3>
      <button onClick={functions}>Function in child</button>
    </div>
  );
};
