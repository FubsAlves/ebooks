import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EbookModel } from '../entities/ebook.model';
import { EbookRepository } from 'src/domain/ebook.repository.interface'; 
import { Ebook } from '../entities/ebook.entity'

@Injectable()
export class DatabaseEbookRepository implements EbookRepository {
  constructor(
    @InjectRepository(Ebook)
    private readonly ebookEntityRepository: Repository<Ebook>,
  ) {}

  async updateContent(id: number): Promise<void> {
    await this.ebookEntityRepository.update(
      {
        id: id,
    });
  }
  async insert(todo: TodoM): Promise<void> {
    const todoEntity = this.toTodoEntity(todo);
    await this.todoEntityRepository.insert(todoEntity);
  }
  async findAll(): Promise<TodoM[]> {
    const todosEntity = await this.todoEntityRepository.find();
    return todosEntity.map((todoEntity) => this.toTodo(todoEntity));
  }
  async findById(id: number): Promise<TodoM> {
    const todoEntity = await this.todoEntityRepository.findOneOrFail(id);
    return this.toTodo(todoEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.todoEntityRepository.delete({ id: id });
  }

  private toTodo(todoEntity: Todo): TodoM {
    const todo: TodoM = new TodoM();

    todo.id = todoEntity.id;
    todo.content = todoEntity.content;
    todo.isDone = todoEntity.isDone;
    todo.createdate = todoEntity.createdate;
    todo.updateddate = todoEntity.updateddate;

    return todo;
  }

  private toTodoEntity(todo: TodoM): Todo {
    const todoEntity: Todo = new Todo();

    todoEntity.id = todo.id;
    todoEntity.content = todo.content;
    todoEntity.isDone = todo.isDone;

    return todoEntity;
  }
}