type CustomTextFieldComponent = {
  placeholder?: string;
  onChange?: any;
  errorMessage?: string;
  fullWidth?: boolean;
  value?: string;
};

const CustomTextField = ({
  placeholder,
  onChange,
  errorMessage,
  fullWidth,
  value,
}: CustomTextFieldComponent) => {
  return (
    <div>
      <textarea
        className={`${fullWidth ? "w-full" : "w-310"} h-179 border ${errorMessage ? "border-red-600" : "border-gray-1"} rounded-md p-10 resize-none outline-none text-black-1 placeholder:text-gray-1`}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={value}
      />
      {errorMessage && <p className="text-rose-600">{errorMessage}</p>}
    </div>
  );
};

export default CustomTextField;
