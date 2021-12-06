import { EbookModel } from 'src/infra/entities/ebook.model';

export interface EbookRepository {
  insert(ebook: EbookModel): Promise<void>;
  findAll(): Promise<EbookModel[]>;
  findById(id: number): Promise<EbookModel>;
  updateContent(id: number): Promise<void>;
  deleteById(id: number): Promise<void>;
}
