import { Roles } from 'src/core/decorators/role.decorator';
import { AttributesService } from './attributes.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserRole } from 'src/core/constants';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Controller('attributes')
export class AttributesController {

    constructor(private readonly attributesService: AttributesService) { }

    @Get()
    async findAll() {
        try {
            const attributes = await this.attributesService.findAll();
            return { attributes }
        } catch (error) {
            throw error
        }
    }

    @Post()
    @Roles([UserRole.ADMIN])
    async create(@Body() createAttributeDto: CreateAttributeDto) {
        try {
            const attribute = await this.attributesService.create(createAttributeDto)

            return { attribute }
        } catch (error) {
            throw error
        }
    }

    @Put(":id")
    @Roles([UserRole.ADMIN])
    async update(@Body() updateAttributeDto: UpdateAttributeDto, @Param("id", ParseIntPipe) id: number) {
        try {
            const attribute = await this.attributesService.update(id, updateAttributeDto)

            return { attribute }
        } catch (error) {
            throw error
        }
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles([UserRole.ADMIN])
    async delete(@Param("id", ParseIntPipe) id: number) {
        try {
            await this.attributesService.delete(id);

            return

        } catch (error) {
            throw error
        }
    }
}