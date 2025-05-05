import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, Modal, Radio, RadioGroup } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { TaskFormTitle } from '@src/app/core/constants/task-form-title';
import { TaskStatus } from '@src/app/core/constants/task-status';
import { Task } from '@src/app/shared/models/Task';
import { resetTaskForm } from '@src/app/store/task-modal/task-modal-slice';

import dayjs from 'dayjs';

import { useContext } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { renderStatusDot } from '@src/app/core/helpers/render-task';
import { AuthContext } from '@src/app/shared/contexts/auth.context';
import { useAppDispatch, useAppSelector } from '@src/app/shared/hooks/redux-hook';
import { ITaskFormFields, taskFormSchema } from '@src/app/shared/schema-validations/task-form';
import { taskService } from '@src/app/shared/services/tasks.service';
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
  const { formTitle, isOpen, taskForm, onSuccess, taskId } = useAppSelector(
    (state) => state.taskForm
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({
    resolver: yupResolver(taskFormSchema),
    values: taskForm,
    defaultValues: { status: TaskStatus.NOT_STARTED }
  });

  const { user } = useContext(AuthContext);

  const dispatch = useAppDispatch();

  function closeModal() {
    dispatch(resetTaskForm());
    reset();
  }

  const onSubmit: SubmitHandler<ITaskFormFields> = async (data) => {
    if (formTitle === TaskFormTitle.ADD) {
      const newTask = new Task(
        crypto.randomUUID(),
        user!.email,
        data.title,
        data.date.toISOString(),
        data.status,
        data.description
      );
      try {
        await taskService.createTask(newTask);
        toast.success('Added task successfully');
        onSuccess?.();
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      } finally {
        closeModal();
      }
    } else if (formTitle === TaskFormTitle.UPDATE) {
      if (taskId) {
        try {
          const updatedTask = new Task(
            taskId,
            user!.email,
            data.title,
            data.date.toISOString(),
            data.status,
            data.description
          );
          await taskService.updateTask({
            task: updatedTask,
            userEmail: user!.email
          });
          toast.success('Edited task successfully');
          onSuccess?.();
        } catch (err) {
          if (err instanceof Error) {
            toast.error(err.message);
          }
        } finally {
          closeModal();
        }
      }
    }
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
