import { BelongsTo, Column, ForeignKey, Model, Table, DataType, BelongsToMany, HasMany, Scopes } from "sequelize-typescript";
import { Product } from "../products/products.entity";
import { AttributeValues } from "../attributes-values/attributes-values.entity";
import { ProductVariationAttribute } from "../products-variations-attributes/products-variations-attributes.entity";
// import { ProductVariationImage } from "../products-variations-images/products-variations-images.entity";
import { CartItem } from "../cart-items/cart-item-entity";
import { Media } from "../media/media.entity";
import { ProductVariationImage } from "../products-variations-images/products-variations-images.entity";

export enum VariationScope {
    WITH_MEDIA = "with media",
    WITH_PRODUCT = "with product",
    WITH_ATTRIBUTES = "with attributes"
}

@Scopes(() => ({
    [VariationScope.WITH_MEDIA]: {
        include: [{
            model: Media,
            through: { attributes: ["id"] }
        }]
    },
    [VariationScope.WITH_PRODUCT]: {
        include: [{
            model: Product
        }]
    },
    [VariationScope.WITH_ATTRIBUTES]: {
        include: [{
            model: AttributeValues,
            through: { attributes: ["id"] }
        }]
    }
}))
@Table({
    tableName: "products_variations",
    indexes: [
        {
            unique: true,
            fields: ["sku", "name"]
        }
    ]
})
export class ProductVariations extends Model<ProductVariations>{
    @Column({
        type: DataType.STRING
    })
    name: string

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    price: number

    @Column({
        type: DataType.STRING
    })
    sku: string

    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    quantity: number

    @ForeignKey(() => Product)
    @Column
    productId: number

    @BelongsToMany(() => Media, () => ProductVariationImage)
    images?: AttributeValues[];

    @BelongsTo(() => Product, { onDelete: "CASCADE" })
    product?: Product

    @BelongsToMany(() => AttributeValues, () => ProductVariationAttribute)
    attributes?: AttributeValues[];

    @HasMany(() => CartItem)
    items: CartItem[]

}    