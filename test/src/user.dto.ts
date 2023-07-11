import { Exclude, Expose, Type } from 'class-transformer';

export class UserEntity {
  @Expose()
  @Type(() => String)
  email: string;
}

@Exclude()
export class ArticleEntity {
  @Expose()
  @Type(() => String)
  title: string;

  description: string;
}
