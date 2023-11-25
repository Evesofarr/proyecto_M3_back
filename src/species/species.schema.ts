import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type SpeciesDocument = Species & Document;

@Schema()
export class Species {
    @Prop({ required: true })
    type: string;
}

export const SpeciesSchema = SchemaFactory.createForClass(Species);