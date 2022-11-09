import { useState } from "react";
import styled from "styled-components";

function EditInput(props: any) {
  const [val, setVal] = useState(props.value);

  return (
    <Input
      type="text"
      autoFocus
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onKeyPress={(event) => {
        if (event.key === "Enter" || event.key === "Escape") {
          props.onSave(val);
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onBlur={() => props.onSave(val)}
      fontSize={props.fontSize}
      margin={props.margin}
    />
  );
}

export default EditInput;

type Input = {
  fontSize: string;
  margin: string;
};

const Input = styled.input<Input>`
  font-size: ${(props) => props.fontSize || "inherit"};
  font-family: inherit;
  margin: ${(props) => props.margin || "inherit"};
  padding: 8px;
  width: 100%;
`;
