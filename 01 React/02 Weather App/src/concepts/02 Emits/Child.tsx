import React, { forwardRef, useImperativeHandle, useState } from "react";

interface ChildProps {
  updateLocalData: (a: string, b: string[], o: Person) => void;
}

export interface Person {
  name: string;
  age: number;
  city: string;
}

export interface ChildRef {
  functionInChild: () => void;
}

export const Child = forwardRef<ChildRef, ChildProps>(
  ({ updateLocalData }, ref) => {
    const [nameInChild, setNameInChild] = useState<string>("Chinmay");
    const [arrayInChild, setArrayInChild] = useState<string[]>([
      "John",
      "Sam",
      "Nick",
    ]);
    const [objectInChild, setObjectInChild] = useState<Person>({
      name: "Chinmay",
      age: 25,
      city: "Pune",
    });

    const functionInChild = (): void => {
      alert("Hi");
    };

    useImperativeHandle(ref, () => ({
      functionInChild,
    }));

    const sendDataToParent = (): void => {
      updateLocalData(nameInChild, arrayInChild, objectInChild);
    };

    return (
      <div>
        <h3>State in Child:{nameInChild}</h3>
        <h3>Array in Child:{JSON.stringify(arrayInChild)}</h3>
        <h3>Object in Child:{JSON.stringify(objectInChild)}</h3>
        <button onClick={sendDataToParent}> send data to parent</button>
      </div>
    );
  }
);
