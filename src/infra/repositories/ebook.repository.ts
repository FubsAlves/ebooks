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
  async insert(ebook: EbookModel): Promise<void> {
    const ebookEntity = this.toEbookEntity(ebook);
    await this.ebookEntityRepository.insert(ebookEntity);
  }
  async findAll(): Promise<EbookModel[]> {
    const ebooksEntity = await this.ebookEntityRepository.find();
    return ebooksEntity.map((ebookEntity) => this.toEbook(ebookEntity));
  }
  async findById(id: number): Promise<EbookModel> {
    const ebookEntity = await this.ebookEntityRepository.findOneOrFail(id);
    return this.toEbook(ebookEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.ebookEntityRepository.delete({ id: id });
  }

  private toEbook(ebookEntity: Ebook): EbookModel {
    const ebook: EbookModel = new EbookModel();

    ebook.id = ebookEntity.id;
    ebook.content = ebookEntity.content;
    ebook.isDone = ebookEntity.isDone;
    ebook.createdate = ebookEntity.createdate;
    ebook.updateddate = ebookEntity.updateddate;

    return ebook;
  }

  private toEbookEntity(ebook: EbookModel): Ebook {
    const ebookEntity: Ebook = new Ebook();

    ebookEntity.id = ebook.id;
    ebookEntity.content = ebook.content;
    ebookEntity.isDone = ebook.isDone;

    return ebookEntity;
  }
}