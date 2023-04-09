export interface UrlParser {
    parse(url: URL): Promise<Object>
}