import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { type KeyboardEventHandler, useCallback } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";

type Props = {
  value: string;
  onChange: (query: string) => void;
};

export function SearchInput({ value, onChange }: Props) {
  const handleEscape = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === "Escape") {
        onChange("");
      }
    },
    [onChange],
  );

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={IoSearchOutline} />
      </InputLeftElement>
      <Input
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        onKeyDown={handleEscape}
      />
      {value && (
        <InputRightElement>
          <Icon as={IoClose} cursor="pointer" onClick={() => onChange("")} />
        </InputRightElement>
      )}
    </InputGroup>
  );
}
