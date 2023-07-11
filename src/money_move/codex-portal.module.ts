import { Module } from '@nestjs/common';
import { ArticleModule } from './transaction';

@Module({
  imports: [ArticleModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class CodexModule {}
