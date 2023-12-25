import { IModel } from "src/core/interface/model.interface";
import { Category } from "../categories/category.entity";
import { SubCategoryImage } from "../sub-category-image/sub-category-image.entity";
import { Product } from "../products/product.entity";

export interface ISubCategory extends IModel {
    name?: string
    slug?: string
    categoryId?: number,
    category?: Category,
    image?: SubCategoryImage,
    products?: Product[]
}