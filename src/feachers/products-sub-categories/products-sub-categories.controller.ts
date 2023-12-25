import { UserRole } from 'src/core/constants';
import { Roles } from 'src/core/decorators/role.decorator';
import { ProductsSubCategoriesService } from './products-sub-categories.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductSubCategoryDto } from './dto/create-product-sub-category.dto';

@Controller('products-sub-categories')
export class ProductsSubCategoriesController {
    constructor(private readonly productsSubCategoriesService: ProductsSubCategoriesService) { }

    @Post()
    @Roles([UserRole.ADMIN])
    async create(@Body() createProductSubCategoryDto: CreateProductSubCategoryDto) {
        try {

            const productSubCategory = await this.productsSubCategoriesService
                .create(createProductSubCategoryDto)

            return { productSubCategory }
        } catch (error) {
            throw error
        }
    }
}