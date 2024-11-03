import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  addTodo: (title: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleCompletion: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getTodo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<Todo[]>(BASE_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);

  const addTodo = async (title: string): Promise<void> => {
    try {
      await axios.post<Todo>(BASE_URL, { title, completed: false });
      getTodo();
    } catch (error) {
      console.error("Can't add todo", error);
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      getTodo();
    } catch (error) {
      console.error("Can't delete todo", error);
    }
  };
  const toggleCompletion = async (id: string): Promise<void> => {
    try {
      const singleTodo = todos.find((todo) => todo.id === id);
      if (!singleTodo) throw new Error("Can't find todo with this ID");

      await axios.put<Todo>(`${BASE_URL}/${id}`, {
        ...singleTodo,
        completed: !singleTodo.completed,
      });
      getTodo();
    } catch (error) {
      console.error("Can't toggle todo", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, isLoading, addTodo, deleteTodo, toggleCompletion }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
