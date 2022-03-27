import toast from 'react-hot-toast';

const useToastError = (t: (key: string) => string, namespace: string) => {
  const notify = (error: any) => toast.error(t(`${namespace}:${error.key}`));

  return { notify };
};

export default useToastError;
