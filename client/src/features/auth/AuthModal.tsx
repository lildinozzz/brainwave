import { Button } from '@components';
import { useState } from 'react';
import { TModalProps, Modal, createModalHook } from 'src/shared/modal';
import { z } from 'zod';

type TFormState = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z
    .string()
    .email('Некорректный email')
    .min(1, 'Email не может быть пустым'),
  password: z.string().min(1, 'Пароль не может быть пустым'),
});

const AuthModal = ({ onClose }: TModalProps) => {
  const [formState, setFormState] = useState<TFormState>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = formSchema.safeParse(formState);

    console.log(result.success);

    onClose();

    console.log('Form Submitted', formState);
  };

  return (
    <Modal.Root>
      <Modal.Content onClose={onClose}>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formState.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor='password'>Пароль</label>
            <input
              type='password'
              id='password'
              name='password'
              value={formState.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button type='submit'>Войти</Button>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
};

export const useAuthModal = createModalHook<TModalProps>((props) => (
  <AuthModal {...props} />
));
