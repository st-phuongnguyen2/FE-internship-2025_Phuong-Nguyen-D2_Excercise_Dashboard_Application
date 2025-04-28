import { JSX, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IFormInputProps {
  message?: string;
  formRegister?: UseFormRegisterReturn;
  label: string;
  customInput?: ReactNode;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

const FormInput = ({
  formRegister,
  message,
  label,
  customInput,
  inputProps
}: IFormInputProps) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={formRegister?.name || label}>
        {label}
      </label>
      {customInput ? (
        customInput
      ) : (
        <input
          className="form-input"
          {...formRegister}
          id={formRegister?.name || label}
          {...inputProps}
        />
      )}
      <p className="form-message">{message}</p>
    </div>
  );
};

export default FormInput;
