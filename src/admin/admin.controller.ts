import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { AdminDTO } from './dto/admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  async create(
    @Body() createAdminDto: CreateAdminDto,
    @Res() response: Response,
  ) {
    try {
      const admin = await this.adminService.create(createAdminDto);
      response.status(201).json(admin);
    } catch (error) {
      console.log(error);
      return response
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json(error.getError() || error.message);
    }
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AdminDTO> {
    return this.adminService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
