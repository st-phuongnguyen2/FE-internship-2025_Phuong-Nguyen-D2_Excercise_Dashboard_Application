import { TaskStatus } from '@src/app/core/constants/task-status';
import * as yup from 'yup';

export interface ITaskFormFields {
  title: string;
  date: Date;
  status: TaskStatus;
  description: string;
}

export const taskFormSchema: yup.ObjectSchema<Omit<ITaskFormFields, 'id'>> = yup
  .object({
    title: yup.string().required().min(5).max(50),
    date: yup
      .date()
      .typeError('Invalid date format')
      .required('Date is required')
      .min(new Date('1900-01-01'), 'Date is too early')
      .max(new Date('2100-12-31'), 'Date is too late'),
    status: yup
      .mixed<TaskStatus>()
      .oneOf(Object.values(TaskStatus), 'Please select the status')
      .required('Status is required'),
    description: yup.string().required().min(5).max(255)
  })
  .required();
