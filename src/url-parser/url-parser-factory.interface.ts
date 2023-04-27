export interface UrlParser {
  parse(url: URL): Promise<object>;
}
