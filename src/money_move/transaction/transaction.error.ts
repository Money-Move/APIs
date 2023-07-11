export class ArticleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ArticleError';
  }
}
