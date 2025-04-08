import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input, Checkbox, Card, CardContent } from "@mui/material";
import { useSidebar } from "../../hooks/useSidebarGet";

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

export default function TaskManager() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const {} = useSidebar("api/");
  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const todo: Todo = {
      id: Date.now(),
      content: newTodo,
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 ">
        <div className="m-auto min-w-10">
          {" "}
          <Input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button onClick={addTodo}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      {todos.length === 0 ? (
        <Card>
          <CardContent className="p-4 text-center text-muted-foreground">
            No tasks yet. Add one above!
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {todos.map((todo) => (
            <Card key={todo.id} className="rounded-xl">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      id={`todo-${todo.id}`}
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`text-sm ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {todo.content}
                    </label>
                  </div>
                  <div>
                    <Button onClick={() => deleteTodo(todo.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button> edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
