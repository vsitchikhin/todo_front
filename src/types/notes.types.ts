import {TodoDto} from "@/types/todos.types";

export interface NoteDto {
  id?: number;
  title: string;
  todos?: TodoDto[]
}
