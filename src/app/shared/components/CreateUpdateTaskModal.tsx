import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Modal, Radio, RadioGroup } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { setTaskForm } from '../../redux-store/task-modal/task-modal-slice';
import { addTask, editTask } from '../../redux-store/tasks/tasks-slice';
import { TaskFormTitle } from '../../utils/constants/task-form-title';
import { TaskStatus } from '../../utils/constants/task-status';
import { renderStatusDot } from '../../utils/render-task';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hook';
import { Task } from '../models/Task';
import {
  ITaskFormFields,
  taskFormSchema
} from '../schema-validations/task-form';
import FormInput from './form/FormInput';

const TASK_STATUS_RADIO = [
  {
    label: 'Not Started',
    value: TaskStatus.NOT_STARTED
  },
  {
    label: 'In Progress',
    value: TaskStatus.IN_PROGRESS
  },
  {
    label: 'Completed',
    value: TaskStatus.COMPLETED
  }
];

const CreateUpdateTaskModal = () => {
  const { formTitle, isOpen, taskForm } = useAppSelector(
    (state) => state.taskForm
  );
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const { tasks, selectedTaskId } = useAppSelector((state) => state.tasks);

  const selectedTask = tasks.find((item) => item.id === selectedTaskId);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(taskFormSchema),
    values: taskForm,
    defaultValues: { status: TaskStatus.NOT_STARTED }
  });

  function closeModal() {
    dispatch(
      setTaskForm({
        isOpen: false,
        taskForm: undefined
      })
    );
  }

  const onSubmit: SubmitHandler<ITaskFormFields> = (data) => {
    console.log('type:', typeof data.date);

    if (formTitle === TaskFormTitle.ADD) {
      dispatch(
        addTask(
          new Task(
            v4(),
            currentUser!.email,
            data.title,
            data.date.toISOString(),
            data.status,
            data.description
          )
        )
      );
      toast.success('Added task successfully');
    } else if (formTitle === TaskFormTitle.UPDATE) {
      if (selectedTask) {
        dispatch(
          editTask(
            new Task(
              selectedTask.id,
              currentUser!.email,
              data.title,
              data.date.toISOString(),
              data.status,
              data.description
            )
          )
        );
        toast.success('Edited task successfully');
      }
    }

    closeModal();
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      className="modal-container"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal">
        <div className="modal-header">
          <h2 className="title">
            {formTitle === TaskFormTitle.ADD ? 'Add New Task' : 'Update'}
          </h2>
          <h2 className="action" onClick={closeModal}>
            Go Back
          </h2>
        </div>
        <form className="form modal-form" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Title"
            formRegister={register('title')}
            message={errors.title?.message}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => {
              return (
                <FormInput
                  label="Date"
                  customInput={
                    <DatePicker
                      enableAccessibleFieldDOMStructure={false}
                      className="form-input date-picker"
                      value={dayjs(field.value)}
                      onChange={(date) => field.onChange(date)}
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          error: !!errors.date
                        }
                      }}
                    />
                  }
                  message={errors.date?.message}
                />
              );
            }}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => {
              return (
                <FormInput
                  label="Status"
                  customInput={
                    <>
                      <RadioGroup
                        {...field}
                        onChange={(data) => field.onChange(data)}
                        row
                        className="radio-input"
                      >
                        {TASK_STATUS_RADIO.map((item) => (
                          <FormControlLabel
                            id={item.label}
                            className="radio-label"
                            value={item.value}
                            control={
                              <Radio
                                className="status-radio"
                                size="small"
                                sx={{
                                  '& .MuiSvgIcon-root': {
                                    fontSize: 16 // tweak this down as far as you like
                                  }
                                }}
                              />
                            }
                            label={
                              <div className="label-group">
                                <img
                                  src={renderStatusDot(item.value)}
                                  alt="icon"
                                  className="icon"
                                />
                                {item.label}
                              </div>
                            }
                            labelPlacement="start"
                          />
                        ))}
                      </RadioGroup>
                    </>
                  }
                  message={errors.status?.message}
                />
              );
            }}
          />
          <FormInput
            label="Task Description"
            formRegister={register('description')}
            customInput={
              <textarea
                className="form-input textarea-input"
                {...register('description')}
              ></textarea>
            }
            message={errors.description?.message}
          />

          <button className={'btn btn-primary'} type="submit">
            Done
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateUpdateTaskModal;
