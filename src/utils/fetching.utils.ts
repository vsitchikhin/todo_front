import axios from "axios";
import {NoteDto} from "@/types/notes.types";
import {TodoDto} from "@/types/todos.types";

export async function loadNoteList() {
  try {
    return (await axios.get(`${process.env.VUE_APP_API_HOST}/notes`)).data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function loadNoteById(id:number) {
  try {
    return (await axios.get(`${process.env.VUE_APP_API_HOST}/notes/${id}`)).data;

  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createNote(payload: NoteDto) {
  try {
    return (await axios.post(`${process.env.VUE_APP_API_HOST}/notes`, payload)).data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function patchNote(id: number, payload: NoteDto) {
  try {
    return (await axios.patch(`${process.env.VUE_APP_API_HOST}/notes/${id}`, payload)).data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteNote(id:number) {
  try {
    return (await axios.delete(`${process.env.VUE_APP_API_HOST}/notes/${id}`)).data;
  } catch(error) {
    console.error(error);
    return null;
  }
}

export async function createTodo(payload: TodoDto) {
  try {
    return (await axios.post(`${process.env.VUE_APP_API_HOST}/todos`, payload)).data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function patchTodo(id: number, payload: TodoDto) {
  try {
    return (await axios.patch(`${process.env.VUE_APP_API_HOST}/todos/${id}`, payload)).data
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteTodo(id: number) {
  try {
    return (await axios.delete(`${process.env.VUE_APP_API_HOST}/todos/${id}`)).data
  } catch (error) {
    console.error(error);
    return null;
  }
}