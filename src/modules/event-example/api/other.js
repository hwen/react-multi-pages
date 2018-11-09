import { get, post } from 'src/http';
import API from './api-list';

const other = API.other;

export const yiyan = () => {
  return get(other.yiyan);
};
