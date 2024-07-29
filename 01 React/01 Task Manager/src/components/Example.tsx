import React, { useState } from "react";

export const Example: React.FC = () => {
  // State to hold the input value
  const [inputValue, setInputValue] = useState<string>("");

  // Event handler for input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    console.log("Input chnaged to ==>", inputValue);
  };

  return (
    <div>
      <label htmlFor="exampleInput">Input:</label>
      <input
        id="exampleInput"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};
