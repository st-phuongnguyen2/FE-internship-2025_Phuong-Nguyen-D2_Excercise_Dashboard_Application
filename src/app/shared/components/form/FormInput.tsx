import { UseFormRegisterReturn } from 'react-hook-form';

interface IFormInputProps {
  message?: string;
  formRegister: UseFormRegisterReturn;
  label: string;
}

const FormInput = ({ formRegister, message, label }: IFormInputProps) => {
  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={formRegister.name}>{label}</label>
      <input className='form-input' {...formRegister} id={formRegister.name} />
      <p className='form-message'>{message}</p>
    </div>
  );
};

export default FormInput;
