import toast from 'react-hot-toast';

const useToast = (t: (key: string) => string, namespace: string) => {
  const notify = (message: any, type: 'error' | 'success' = 'error') => toast[type](t(`${namespace}:${message.key}`));

  return { notify };
};

export default useToast;
