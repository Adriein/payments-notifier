import axios from 'axios';
import { PRO, PRO_URL, DEV_URL } from '../constants';

export default axios.create({
  baseURL: process.env.NODE_ENV === PRO ? PRO_URL : DEV_URL,
});
