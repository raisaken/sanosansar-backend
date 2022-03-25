import { Injectable } from '@nestjs/common';
import { Contact } from 'src/database/models/contact.entity';
import { Connection, Repository } from 'typeorm';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private _contactReopository: Repository<Contact>;

  constructor(private _connection: Connection) {
    this._contactReopository = this._connection.getRepository(Contact);
  }

  create(createContactDto: CreateContactDto) {
    return this._contactReopository.save(createContactDto);
  }

  findAll() {
    return this._contactReopository.find();
  }

  findOne(id: number) {
    return this._contactReopository.findOne(id);
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this._contactReopository.findOneOrFail(id);
    contact.name = updateContactDto.name || contact.name;
    contact.email = updateContactDto.email || contact.email;
    contact.subject = updateContactDto.subject || contact.subject;
    contact.message = updateContactDto.message || contact.message;
    await this._contactReopository.save(contact);
    return contact;
  }

  remove(id: number) {
    return this._contactReopository.delete(id);
  }
}
