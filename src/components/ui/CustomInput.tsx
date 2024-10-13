import { ChangeEventHandler } from "react";

type CustomInputType = {
  type: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  errorMessage?: string;
  width?: number;
};

const CustomInput = (props: CustomInputType) => {
  const style = {
    width: props.width + "px",
  };

  return (
    <div>
      <input
        className={`w-310 h-50 border ${props.errorMessage ? "border-red-600" : "border-gray-1"} rounded-md px-10 outline-none text-black-1 placeholder:text-gray-1`}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        style={style}
      />
      {props.errorMessage && (
        <p className="text-rose-600">{props.errorMessage}</p>
      )}
    </div>
  );
};

export default CustomInput;
