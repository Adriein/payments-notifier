import {
  FiCheckCircle,
  FiAlertCircle,
  FiCreditCard,
  FiXCircle,
} from 'react-icons/fi';

export const selectData = {
  defaulters: [
    { value: 'all', label: 'Todos los usuarios' },
    { value: 'true', label: 'Usuarios con tarifa expirada' },
    { value: 'false', label: 'Usuarios sin tarifa expirada' },
  ],
  pricings: [
    { value: 'all', label: 'Todas las tarifas' },
    { value: 'Mensual', label: 'Mensual' },
    { value: 'Trimestral', label: 'Trimestral' },
  ],
};

export const modalData = {
  softDelete: {
    title: 'Inactivar usuario',
    message: 'Estás seguro que deseas inactivar el usuario?',
    icon: <FiAlertCircle size="90px" />,
    colors: 'warning',
  },
  save: {
    title: 'Guardar el usuario',
    message: 'Estás seguro que deseas guardar el usuario?',
    icon: <FiCheckCircle size="90px" />,
    colors: 'success',
  },
  hardDelete: {
    title: 'Borrar el usuario',
    message: 'Estás seguro que deseas borrar el usuario?',
    icon: <FiXCircle size="90px" />,
    colors: 'error',
  },
  payment: {
    title: 'Registrar pago',
    message: 'Estás seguro que deseas registrar el pago para este usuario?',
    icon: <FiCreditCard size="90px" />,
    colors: 'success',
  },
};
