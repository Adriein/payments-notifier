import {
  FiCheckCircle,
  FiAlertCircle,
  FiCreditCard,
  FiXCircle,
  FiDatabase,
  FiHeart,
} from 'react-icons/fi';

import { IoFastFoodOutline } from 'react-icons/io5';

export const selectData = {
  defaulters: [
    { value: 'default', label: 'Todos los usuarios' },
    { value: 'true', label: 'Usuarios con tarifa expirada' },
    { value: 'false', label: 'Usuarios sin tarifa expirada' },
  ],
  pricings: [
    { value: 'default', label: 'Todas las tarifas' },
    { value: 'mensual', label: 'Mensual' },
    { value: 'trimestral', label: 'Trimestral' },
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

export const userFormTabs = [
  { title: '1. Datos generales', icon: <FiDatabase size="20px" /> },
  { title: '2. Nutrición', icon: <IoFastFoodOutline size="20px" /> },
  { title: '3. Ejercicio', icon: <FiHeart size="20px" /> },
];
