import React, { useRef, useState } from "react";
import { Child, ChildRef, Person } from "./Child";

export const Parent: React.FC = () => {
  const childRef = useRef<ChildRef>(null);

  const [localVar, setLocalVar] = useState<string>("");
  const [localArray, setLocalArray] = useState<string[]>([]);
  const [localObject, setLocalObject] = useState<Person>({
    name: "",
    age: 0,
    city: "",
  });

  const updateLocalData = (v: string, a: string[], o: Person): void => {
    setLocalVar(v);
    setLocalArray(a);
    setLocalObject(o);
  };

  const callChildFunction = (): void => {
    if (childRef.current) {
      childRef.current.functionInChild();
    }
  };

  return (
    <div>
      <h3>State in Parent:{localVar}</h3>
      <h3>Array in Parent:{JSON.stringify(localArray)}</h3>
      <h3>Object in Parent:{JSON.stringify(localObject)}</h3>
      <button onClick={callChildFunction}>Function in Parent</button>
      <hr />
      <Child updateLocalData={updateLocalData} ref={childRef} />
    </div>
  );
};
