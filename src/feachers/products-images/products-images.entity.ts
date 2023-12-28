import { Product } from '../products/products.entity';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({ tableName: "products_images" })
export class ProductImage extends Model<ProductImage> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    url: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    storageKey: string

    @ForeignKey(() => Product)
    @Column
    productId: number;

    @BelongsTo(() => Product, { onDelete: "CASCADE" })
    product: Product;

}