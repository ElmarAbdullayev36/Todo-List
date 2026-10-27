import React, { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState({
    name: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const inputHandle = (e) => {
    setInput({
      name: e.target.value,
    });
  };

  const addTodo = () => {
    if (input.name.trim() === "") return;

    if (isEdit) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, name: input.name } : todo
        )
      );

      setIsEdit(false);
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          name: input.name,
          completed: false,
        },
      ]);
    }

    setInput({
      name: "",
    });
  };

  const editTodo = (id) => {
    const todo = todos.find((item) => item.id === id);

    setInput({
      name: todo.name,
    });

    setEditId(id);
    setIsEdit(true);
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((item) => item.id !== id);

    setTodos(filteredTodos);
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12 text-slate-800">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl text-indigo-600 shadow-sm">
            ✓
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[4px] text-indigo-600">
            Productivity
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            My Tasks<span className="text-indigo-600">.</span>
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Organize your day, complete your tasks and stay productive.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="border-b border-slate-100 bg-slate-50/70 p-5 md:p-7">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={input.name}
                onChange={inputHandle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTodo();
                  }
                }}
                placeholder="What needs to be done?"
                className="h-14 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />

              <button
                onClick={addTodo}
                className="h-14 rounded-2xl bg-indigo-600 px-7 font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95"
              >
                {isEdit ? "Update Task" : "+ Add Task"}
              </button>
            </div>

            {isEdit && (
              <button
                onClick={() => {
                  setIsEdit(false);
                  setEditId(null);
                  setInput({ name: "" });
                }}
                className="mt-3 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
              >
                Cancel editing
              </button>
            )}
          </div>

          <div className="flex items-center justify-between px-5 py-6 md:px-7">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Your Tasks</h2>

              <p className="mt-1 text-sm text-slate-500">
                {todos.length} {todos.length === 1 ? "task" : "tasks"}
              </p>
            </div>

            {todos.length > 0 && (
              <button
                onClick={clearAll}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-rose-500 transition hover:bg-rose-50 hover:text-rose-600"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="px-5 pb-6 md:px-7 md:pb-7">
            {todos.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-5 py-14 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl text-indigo-600">
                  ✓
                </div>

                <h3 className="font-bold text-slate-800">No tasks yet</h3>

                <p className="mt-2 text-sm text-slate-500">
                  Add your first task and get things done.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`group flex items-center gap-3 rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      todo.completed
                        ? "border-emerald-100 bg-emerald-50/60"
                        : "border-slate-200 bg-white hover:border-indigo-200 hover:shadow-slate-200/60"
                    }`}
                  >
                    <button
                      onClick={() => completeTodo(todo.id)}
                      aria-label={
                        todo.completed
                          ? "Mark as incomplete"
                          : "Mark as complete"
                      }
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                        todo.completed
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-300 bg-white hover:border-indigo-500 hover:bg-indigo-50"
                      }`}
                    >
                      {todo.completed && "✓"}
                    </button>

                    <span
                      className={`min-w-0 flex-1 break-words text-sm font-medium ${
                        todo.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-700"
                      }`}
                    >
                      {todo.name}
                    </span>

                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => editTodo(todo.id)}
                        className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-500 transition hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="mt-7 text-center text-xs font-medium tracking-wide text-slate-400">
          Made for productivity · One task at a time.
        </p>
      </div>
    </div>
  );
};

export default App;
