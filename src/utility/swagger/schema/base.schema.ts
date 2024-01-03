import { ApiPropertyOptional } from "@nestjs/swagger";
import { IModel } from "src/core/interface/model.interface";

export class BaseSchema implements IModel {

    @ApiPropertyOptional({ description: "record id" })
    id: number

    @ApiPropertyOptional({ description: "record created date" })
    createdAt: string

    @ApiPropertyOptional({ description: "record updated date" })
    updatedAt: string
}