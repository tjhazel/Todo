import useSWR, { mutate } from 'swr';
import { swrOptions } from '../lib/swr.functions';
import type { TodoItem } from './todoItem';
import fetcher from '../lib/httpClient';
import { env } from '../lib/env.settings';

const todoItemBaseUrl = () => `${env.domain}api/todoItem`;
const todoItemtUrl = (id: number) => `${todoItemBaseUrl()}/${id}`;

export function useTodoItems() {
   const { data, isValidating, error } = useSWR<TodoItem[]>(
      todoItemBaseUrl(),
      fetcher,
      { ...swrOptions }
   );
   console.log('data', data)

   return {
      data: data,
      isLoading: !error && !data && isValidating,
      error: error?.message
   };
}

export const createTodoItem = async (todoItem: TodoItem) => {
   const result = await fetcher(todoItemBaseUrl(), {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoItem),
   })
      .then(() => mutate(todoItemBaseUrl));
   return result;
}

export const updateTodoItem = async (todoItem: TodoItem) => {
   const result = await fetcher(todoItemBaseUrl(), {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoItem),
   })
      .then(() => mutate(todoItemBaseUrl));

   return result;
}

export const deleteTodoItem = async (id: number) => {
   const result = await fetcher(todoItemtUrl(id), {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
      }
   })
      .then(() => mutate(todoItemBaseUrl));
   return result;
}
