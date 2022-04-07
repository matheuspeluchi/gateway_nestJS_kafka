import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { AdminEntity } from './entities/admin.entity';
import { AdminDTO } from './dto/admin.dto';
import { BadRequestError } from 'src/common/exceptions/BadRequestError';
import { BusinessError } from 'src/common/exceptions/BusinessError';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
  ) { }

  async create(createAdminDto: CreateAdminDto): Promise<AdminDTO> {
    if (createAdminDto.name.length < 3)
      throw new BadRequestError({
        source: 'name',
        detail: 'O nome deve conter ao menos três caracteres',
      });

    const exist = await this.findByLogin(createAdminDto.login);
    if (exist) {
      throw new BusinessError({
        source: 'login',
        detail: `Já existe um usuário com o login ${createAdminDto.login}`,
      });
    }
    const adminEntity = new AdminEntity(createAdminDto);
    const createdAdmin = await this.adminModel.create(adminEntity.toJson());
    const saved = await createdAdmin.save();
    return AdminEntity.fromJson(saved).toAdminDTO();
  }

  async findAll(): Promise<AdminEntity[]> {
    const admins = await this.adminModel.find({}).then((res) => res);
    const adminsEntities = admins.map((admin) => AdminEntity.fromJson(admin));
    return adminsEntities;
  }

  async findById(id: string): Promise<AdminDTO> {
    const admin = await this.adminModel.findById(id).then((res) => res);
    return AdminEntity.fromJson(admin).toAdminDTO();
  }

  async findByLogin(login: string): Promise<AdminDTO> {
    const admin = await this.adminModel.findOne({ login }).then((res) => res);
    if (admin) {
      return AdminEntity.fromJson(admin).toAdminDTO();
    } else {
      return null;
    }
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: string): void {
    this.adminModel.findOneAndDelete({ _id: id });
  }
}
