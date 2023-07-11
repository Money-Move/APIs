import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CodexArticleDocument = CodexArticle & Document;

export enum EStatusHistory {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  REJECTED = 'REJECTED',
}

@Schema({
  toJSON: {
    virtuals: true,
    transform: (_, converted) => {
      delete converted._id;
    },
  },
  toObject: {
    getters: true,
  },
  versionKey: false,
  timestamps: true,
  minimize: false,
})
export class CodexArticle {
  @Prop({ default: '', trim: true })
  currency: string;

  @Prop({})
  amount: number;

  @Prop({})
  bankId: number;

  @Prop({})
  receiverBankAccount: number;

  @Prop({ default: '', trim: true })
  receiverBankName: string;

  @Prop({})
  senderBankAccount: number;

  @Prop({ default: '', trim: true })
  senderBankName: string;

  @Prop({ default: '', trim: true })
  description: string;

  @Prop({ enum: EStatusHistory })
  status: EStatusHistory;
}

export const CodexArticleSchema = SchemaFactory.createForClass(CodexArticle);
