import toast from 'react-hot-toast';

const useToast = () => {
  const notify = {
    error: (message: string) => toast.error(message),
    success: (message: string) => toast.success(message)
  };

  return { notify };
};

export default useToast;
