import toast from 'react-hot-toast';

const useToastError = (t: (key: string) => string) => {
  const notify = (error: any) => toast.error(t(error.key));

  return { notify };
};

export default useToastError;
