import { useState } from "react";
import { Child } from "./Child";

export interface Person {
  name: string;
  age: number;
  city: string;
}
export const Parent: React.FC = () => {
  const [nameInParent, setNameInParent] = useState<string>("chinmay");

  const [namesArray, setNamesArray] = useState<string[]>([
    "John",
    "Rock",
    "Sam",
    "Tim",
  ]);

  const [chinmay, setChinmay] = useState<Person>({
    name: "Chinmay",
    age: 25,
    city: "Pune",
  });

  const showAlert = (): void => {
    alert("Helllo");
  };

  return (
    <div>
      <h3>Name in Parent:{nameInParent}</h3>
      <Child
        states={nameInParent}
        array={namesArray}
        object={chinmay}
        functions={showAlert}
      />
    </div>
  );
};
