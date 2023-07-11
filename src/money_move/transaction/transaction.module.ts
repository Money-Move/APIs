import { Module } from '@nestjs/common';
import { ArticleController } from './transaction.controller';
import { ArticleService } from './transaction.service';
import { addMongoToModule } from 'databases/mongodb';
import { CODEX_PORTAL_MONGO } from 'money_move/codex-portal.constant';
import { CodexArticleSchema } from 'money_move/mongo-schema';

@Module({
  imports: [
    addMongoToModule([
      { ...CODEX_PORTAL_MONGO.article, schema: CodexArticleSchema },
    ]),
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
