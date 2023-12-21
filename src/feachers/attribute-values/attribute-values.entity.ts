import { ProductVariations } from 'src/feachers/product-variations/product-variations.entity';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany, BelongsToMany } from "sequelize-typescript";
import { Attribute } from "../attributes/attribute.entity";
import { ProductVariationAttribute } from "../product_variation_attributes/product_variation_attributes.entity";

@Table({
    tableName: "attribute_values"
})
export class AttributeValues extends Model<AttributeValues>{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    value: string;

    @ForeignKey(() => Attribute)
    @Column({ allowNull: false })
    attributeId: number

    @BelongsTo(() => Attribute, { onDelete: "CASCADE" })
    attribute: Attribute


    @BelongsToMany(() => ProductVariations, () => ProductVariationAttribute)
    productVariations: ProductVariations[];
}