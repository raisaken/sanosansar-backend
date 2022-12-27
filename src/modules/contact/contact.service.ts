import { Injectable } from '@nestjs/common';
import { Contact } from 'src/database/models/contact.entity';
import { Connection, Repository } from 'typeorm';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private _contactRepository: Repository<Contact>;

  constructor(private _connection: Connection) {
    this._contactRepository = this._connection.getRepository(Contact);
  }

  create(createContactDto: CreateContactDto) {
    return this._contactRepository.save(createContactDto);
  }

  findAll() {
    return this._contactRepository.find();
  }

  findOne(id: number) {
    return this._contactRepository.findOne(id);
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this._contactRepository.findOneOrFail(id);
    contact.name = updateContactDto.name || contact.name;
    contact.email = updateContactDto.email || contact.email;
    contact.subject = updateContactDto.subject || contact.subject;
    contact.message = updateContactDto.message || contact.message;
    await this._contactRepository.save(contact);
    return contact;
  }

  remove(id: number) {
    return this._contactRepository.delete(id);
  }
}
