import clsx from "clsx";

/**
 *
 * @param {Object} props
 * @param {String} props.placeholder
 * @param {Boolean} props.isInvalid
 * @param {Boolean} props.required
 * @param {String} props.name
 * @param {String} props.defaultValue
 * @returns {JSX.Element}
 */
const TextField = ({
  placeholder,
  isInvalid,
  name,
  required,
  defaultValue,
}) => {
  return (
    <div className="relative flex min-w-80 flex-1 items-center">
      {isInvalid && (
        <span className="text-body-l text-red absolute right-4">
          Can’t be empty
        </span>
      )}
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={clsx(
          "border-medium-grey/25 text-body-l w-full rounded-[4px] border py-2 pl-4",
          {
            "border-red pr-32": isInvalid,
            "pr-4": !isInvalid,
          },
        )}
      />
    </div>
  );
};

export default TextField;
