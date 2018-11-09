import { get, post } from 'src/http';
import API from './api-list';

const cnode = API.cnode;

export const topics = () => {
  const url = cnode.topics;
  return get(url);
};

export const topicDetail = id => {
  const url = `${cnode.topicDetail}/${id}`;
  return get(url);
};
