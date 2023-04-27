export interface UrlScrapper {
  scrapp(url: string): Promise<void>;
}
