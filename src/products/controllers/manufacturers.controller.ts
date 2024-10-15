import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
  import { ManufacturersService } from '../services/manufacturers.service';
  import { CreateManufacturerDTO, UpdateManufacturerDTO } from '../dtos/manufacturer.dto';
  
  @Controller('manufactures')
  export class ManufacturersController {
    constructor(private manufacturesService: ManufacturersService) {}
  
    @Post()
    createManufacturer(@Body() payload: CreateManufacturerDTO) {
      return {
        ok: true,
        message: 'Manufacturer created successfully',
        payload,
      };
    }
  
    @Put(':manufactureId')
    updateManufacturer(
      @Param('manufactureId') manufactureId: string,
      @Body() body: UpdateManufacturerDTO,
    ): any {
      return {
        ok: true,
        message: 'Manufacturer updated successfully',
        data: body,
      };
    }
  
    @Delete(':manufacturerId')
    deleteManufacturer(@Param('manufactureId', ParseIntPipe) manufacturerId: number): any {
      const manufactures = this.manufacturesService.remove(manufacturerId);
      return {
        ok: true,
        message: 'Manufacturer deleted successfully',
        manufacturerId,
        delete: true,
        manufactures,
        count: manufactures.length,
      };
    }
  
    @Get()
    getAllManufacturers() {
      const manufactures = this.manufacturesService.findAll();
      return {
        ok: true,
        message: 'All manufacturers retrieved successfully',
        manufactures,
      };
    }
  
    @Get(':manufactureId')
    getManufacturerById(@Param('manufactureId', ParseIntPipe) manufactureId: number) {
      const manufacture = this.manufacturesService.findOne(manufactureId);
      return {
        ok: true,
        message: `Manufacturer with ID ${manufactureId} retrieved successfully`,
        manufacture,
      };
    }
  
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
  