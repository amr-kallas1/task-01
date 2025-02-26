interface UserIconProps {
  size?: string;
  color?: string;
}

const Clock: React.FunctionComponent<UserIconProps> = ({
  color,
  size,
  ...props
}) => {
  return (
    <svg
      width={size || "14"}
      height={size || "14"}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.99996 3.50002V7.00002L9.33329 8.16669M12.8333 7.00002C12.8333 10.2217 10.2216 12.8334 6.99996 12.8334C3.7783 12.8334 1.16663 10.2217 1.16663 7.00002C1.16663 3.77836 3.7783 1.16669 6.99996 1.16669C10.2216 1.16669 12.8333 3.77836 12.8333 7.00002Z"
        stroke={color ?? "#667085"}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Clock;
