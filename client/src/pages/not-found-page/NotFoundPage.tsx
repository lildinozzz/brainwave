import { pathsConfig } from '@config';
import { Link } from '@shared';

export const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='text-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full'>
        <h1 className='text-6xl font-bold text-gray-800'>404</h1>
        <p className='text-lg text-gray-600 mt-4'>Страница не найдена</p>
        <Link
          href={pathsConfig.home.link}
          className='mt-6 inline-block text-blue-500 font-semibold text-lg'
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};
