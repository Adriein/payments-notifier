import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";

const useToastError = (namespace: string) => {
  const { t } = useTranslation(namespace);
  const notify = (error: any) => toast.error(t(error.key));

  return { notify };
};

export default useToastError;
