import { pathsConfig } from '@config';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { authenticateThunk } from '../model/reducer';
import {
  useAppDispatch,
  usePreventBodyScroll,
  Button,
  Input,
  Modal,
  createModalHook,
  TModalProps,
} from '@shared';

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
  usePreventBodyScroll(true);
  const dispatch = useAppDispatch();
  const [currentWindowHash, setCurrentWindowHash] = useState('');
  const [formState, setFormState] = useState<TFormState>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = formSchema.safeParse(formState);

      if (!result.success) {
        const errorMap = result.error.errors.reduce(
          (acc: { [key: string]: string }, curr) => {
            acc[curr.path[0] as keyof TFormState] = curr.message;
            return acc;
          },
          {}
        );

        setErrors(errorMap);
        return;
      }

      setErrors({});
      dispatch(authenticateThunk(formState));

      handleCloseModal();
    } catch (error) {
      console.error('Errorr while submitting auth data', error);
    }
  };

  const handleCloseModal = () => {
    onClose();
    window.location.hash = '';
  };

  const renderText = () => {
    if (currentWindowHash === pathsConfig.signUp.key) {
      return 'Sign Up';
    } else {
      return 'Sign In';
    }
  };

  const textToRender = renderText();

  useEffect(() => {
    setCurrentWindowHash(window.location.hash);
  }, []);

  return (
    <Modal.Root>
      <Modal.Content onClose={handleCloseModal}>
        <form
          onSubmit={onSubmit}
          className='w-full h-full m-h-[410px] relative py-[20px] px-[22px] rounded-[16px] flex flex-col bg-n-8 border border-n-6'
        >
          <h3 className='h3 mx-auto'>{textToRender}</h3>

          <div className='flex flex-col gap-14 mt-10'>
            <Input
              label='Email'
              onChange={handleInputChange}
              name='email'
              type='email'
              isError={!!errors.email}
              errorMessage={errors.email}
            />
            <Input
              label='Password'
              onChange={handleInputChange}
              name='password'
              type='password'
              isError={!!errors.password}
              errorMessage={errors.password}
            />
          </div>

          <Button className='mt-auto' theme type='submit'>
            {textToRender}
          </Button>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
};

export const useAuthModal = createModalHook<TModalProps>((props) => (
  <AuthModal {...props} />
));
