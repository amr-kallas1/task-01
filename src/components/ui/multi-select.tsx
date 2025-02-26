import { cn } from "@/lib/utils";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import Select, {
  ClearIndicatorProps,
  MultiValueRemoveProps,
  components,
} from "react-select";

interface MultiSelectProps {
  options: { label: string; value: string }[];
  isMulti?: boolean;
  inputName?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const controlStyles = {
  base: cn(
    "h-full items-start!  rounded-lg bg-white hover:cursor-pointer px-[14px] py-[10px] "
  ),
  focus: "border-brand-400",
  nonFocus: " border-gray-300 ",
};
const placeholderStyles = "text-gray-500 ";
const selectInputStyles = "";
const valueContainerStyles = "gap-2 flex";
const singleValueStyles = "  text-gray-700 font-medium";
const multiValueStyles =
  "flex items-center rounded-sm px-1 py-0.5 border border-gray-300 text-gray-700 h-6 text-sm font-md ";
const multiValueLabelStyles =
  "leading-6 mr-2 bg-brad-400 text-gray-700 text-sm font-sm";
const multiValueRemoveStyles = "";
const indicatorsContainerStyles = "hidden";
const clearIndicatorStyles =
  "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
const indicatorSeparatorStyles = "bg-transparent";
const dropdownIndicatorStyles = "hidden!";
const menuStyles =
  "p-1 mt-2 border border-gray-200 bg-white rounded-lg shadow-md z-9999!";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm!";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded-sm ",
  focus: "bg-gray-100 active:bg-gray-200 ",
  selected: "after:content-['✔'] after:ml-2 after:text-gray-400 text-gray-500!",
};
const noOptionsMessageStyles =
  "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-xs";
const disabledStyles =
  "opacity-50 bg-gray-200 text-gray-400 cursor-not-allowed";

const MultiSelect: FC<MultiSelectProps> = ({
  options,
  isMulti,
  inputName,
  placeholder = "Search",
  className,
  disabled,
  isLoading = false,
  ...other
}) => {
  const selectRef = useRef<any | undefined>(undefined);
  const valueRef = useRef("");
  const [inputValue, setInputValue] = useState("");

  const ClearIndicator = (props: ClearIndicatorProps) => {
    return (
      <components.ClearIndicator {...props}>
        <img />
      </components.ClearIndicator>
    );
  };

  const MultiValueRemove = (props: MultiValueRemoveProps) => {
    return (
      <components.MultiValueRemove {...props}>
        <img src="/assets/x-close.svg" alt="" />
      </components.MultiValueRemove>
    );
  };

  const handleFocus = () => {
    if (selectRef.current.getValue().length && !isMulti) {
      setInputValue(selectRef.current.getValue()[0].label);
    }
  };

  const NoOptionsMessage = () => {
    return (
      <div className="text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-xs">
        {selectRef?.current.inputRef.value ? (
          <p className="text-center">No data found</p>
        ) : (
          <p className="text-center">No data found</p>
        )}
      </div>
    );
  };

  const LoadingMessage = () => {
    return (
      <div className="text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-xs">
        <p className="text-center">Loading...</p>
      </div>
    );
  };

  const handleChange = (newValue: { label: string; value: string }) => {
    if (newValue?.label) valueRef.current = newValue?.label;
  };

  useEffect(() => {
    const handleKeyDown = (event: Event) => {
      if ((event as unknown as KeyboardEvent).key === "Backspace") {
        if (
          selectRef.current &&
          valueRef.current?.length === 1 &&
          inputValue.length === 0 &&
          !isMulti
        ) {
          selectRef.current.clearValue();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex border border-gray-300 rounded-md">
      <Select
        className={cn("grow ", className, disabled ? disabledStyles : "")}
        options={options.map(({ label, value }) => ({
          label: label,
          value,
        }))}
        onFocus={handleFocus}
        inputValue={inputValue}
        isClearable
        onMenuClose={() => {
          setTimeout(() => {
            selectRef.current.blur();
          }, 0);
        }}
        onChange={(newValue) => {
          handleChange(newValue as { label: string; value: string });
        }}
        styles={{
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
          }),
          multiValueLabel: (base) => ({
            ...base,
            whiteSpace: "normal",
            overflow: "visible",
          }),
          control: (base) => ({
            ...base,
            transition: "none",
          }),
        }}
        components={{
          ClearIndicator,
          MultiValueRemove,
          NoOptionsMessage,
          LoadingMessage,
        }}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            cn(
              isFocused && optionStyles.focus,
              isSelected && optionStyles.selected,
              optionStyles.base
            ),
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        isMulti={isMulti}
        onInputChange={(value) => {
          setInputValue(value);
          if (value) valueRef.current = value;
        }}
        ref={selectRef}
        isDisabled={disabled}
        placeholder={placeholder}
        unstyled
        isLoading={isLoading}
        openMenuOnClick
        {...other}
      />
    </div>
  );
};

export default MultiSelect;
