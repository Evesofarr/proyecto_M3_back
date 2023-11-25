import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type VillagerDocument = Villager & Document;

@Schema()
export class Villager {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    url: string;

    @Prop({ required: true })
    title_color: string;

    @Prop({ required: true })
    text_color: string;

    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    image_url: string;

    @Prop({ required: true })
    species: string;

    @Prop({ required: true })
    personality: string;

    @Prop({ required: true })
    gender: string;

    @Prop({ required: true })
    birthday_month: string;

    @Prop({ required: true })
    birthday_day: string;

    @Prop({ required: true })
    sign: string;

    @Prop({ required: true })
    quote: string;

    @Prop({ required: true })
    phrase: string;
}

export const VillagerSchema = SchemaFactory.createForClass(Villager);
