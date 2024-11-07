import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
  import { ManufacturersService } from '../services/manufacturers.service';
  import { CreateManufacturerDTO, UpdateManufacturerDTO } from '../dtos/manufacturer.dto';
import { ApiOperation } from '@nestjs/swagger';
  
  @Controller('manufacturers')
  export class ManufacturersController {
    constructor(private manufacturesService: ManufacturersService) {}
  
    @ApiOperation({summary: 'Create manufacturer'})
    @Post()
    async createManufacturer(@Body() payload: CreateManufacturerDTO) {
      const manufacturer = await this.manufacturesService.create(payload)
      return {
        ok: true,
        message: 'Manufacturer created successfully',
        manufacturer
      };
    }
  
    @ApiOperation({summary: 'Update manufacturer'})
    @Put(':manufactureId')
    async updateManufacturer(
      @Param('manufactureId') manufactureId: string,
      @Body() body: UpdateManufacturerDTO,
    ) {
      const manufacturerToUpdate = await this.manufacturesService.update(manufactureId, body);
      return {
        ok: true,
        message: 'Manufacturer updated successfully',
        manufacturer: manufacturerToUpdate
      };
    }
    
    @ApiOperation({summary: 'Delete manufacturer'})
    @Delete(':manufacturerId')
    async deleteManufacturer(@Param('manufactureId') manufacturerId: string) {
      await this.manufacturesService.remove(manufacturerId);
      return {
        ok: true,
        message: 'Manufacturer deleted successfully',
        manufacturerId,
      };
    }
  
    @ApiOperation({summary: 'Get all manufacturers'})
    @Get()
    async getAllManufacturers() {
      const manufactures = await this.manufacturesService.findAll();
      return {
        ok: true,
        message: 'All manufacturers retrieved successfully',
        manufactures,
      };
    }
    
    @ApiOperation({summary: 'Get manufacturer by id'})
    @Get(':manufactureId')
    getManufacturerById(@Param('manufactureId') manufactureId: string) {
      const manufacture = this.manufacturesService.findOne(manufactureId);
      return {
        ok: true,
        message: `Manufacturer with ID ${manufactureId} retrieved successfully`,
        manufacture,
      };
    }
  
    @ApiOperation({ summary: 'Get manufacturer by filter' })
    @Get('filter')
    getManufacturerByFilter(@Query('name') name: string) {
      const filterCriteria: any = {};
      if (name) filterCriteria.name = name;
  
      return {
        ok: true,
        message: `Manufacturers filtered by criteria: ${JSON.stringify(filterCriteria)}`,
        manufactures: [{ id: 1, name: name || 'Manufacture A' }],
      };
    }
  }
  