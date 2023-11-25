import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PersonalityDocument = Personality & Document;

@Schema()
export class Personality {
    @Prop({ required: true })
    type: string;
}

export const PersonalitySchema = SchemaFactory.createForClass(Personality);