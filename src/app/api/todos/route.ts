import { NextResponse } from "next/server";

let todos: { id: number; title: string; completed: boolean }[] = [
  { id: 123, title: "Write documentation", completed: false },
];

export async function GET() {
  return NextResponse.json(todos);
}


export async function POST(request: Request) {
  const body = await request.json();
  const newTodo = {
    id: Date.now(),
    title: body.title,
    completed: false,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const index = todos.findIndex((todo) => todo.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  todos[index] = { ...todos[index], ...body };
  return NextResponse.json(todos[index]);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  todos = todos.filter((todo) => todo.id !== id);
  return NextResponse.json({ message: "Deleted" });
}
