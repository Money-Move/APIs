import {
  Controller,
  Get,
  BadRequestException,
  Post,
  Body,
} from '@nestjs/common';
import { ArticleService } from './transaction.service';

@Controller('transaction')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('v1/histories')
  async getAllArticle() {
    try {
      return await this.articleService.getAllArticle();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('v1/histories')
  async createArticle(@Body() payload: any) {
    try {
      return await this.articleService.createArticle(payload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
