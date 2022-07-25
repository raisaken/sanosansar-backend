import { Injectable } from '@nestjs/common';
import { Team } from 'src/database/models/team.entity';
import { Connection, Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  private _teamRepository: Repository<Team>;

  constructor(private _connection: Connection) {
    this._teamRepository = this._connection.getRepository(Team);
  }

  async create(teamInput: CreateTeamDto) {
    const team = await this._teamRepository.save(teamInput);
    return team;
  }

  findAll() {
    return this._teamRepository.find();
  }

  findOne(id: number) {
    return this._teamRepository.findOne(id);
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const { name, position, description, image, order, phone, email, facebookLink, twitterLink, instagramLink } = updateTeamDto;
    const team = await this.findOne(id);

    if(team){
      team.name =  name || team.name;
      team.position =  position || team.position;
      team.description = description || team.description;
      team.order =  order || team.order;
      team.phone =  phone || team.phone;
      team.email =  email || team.email;
      team.facebookLink =  facebookLink || team.facebookLink;
      team.twitterLink =  twitterLink || team.twitterLink;
      team.instagramLink =  instagramLink || team.instagramLink;

      team.image = image || team.image;
      await this._teamRepository.save(team);
    }
    return team;
  }

  remove(id: number) {
    return this._teamRepository.delete(id);
  }
}
