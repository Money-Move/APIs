import { Injectable } from '@nestjs/common';
import { InjectModelDefault } from 'common/decorators';
import { CODEX_PORTAL_MONGO } from 'money_move';
import { CodexArticleDocument } from 'money_move/mongo-schema';
import { Model } from 'mongoose';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModelDefault(CODEX_PORTAL_MONGO.article.name)
    private readonly codexArticle: Model<CodexArticleDocument>,
  ) {}

  public async getAllArticle(): Promise<any> {
    const result = this.codexArticle.find({});
    return result;
  }

  public async createArticle(payload: any): Promise<any> {
    await this.codexArticle.create(payload);
  }
}
