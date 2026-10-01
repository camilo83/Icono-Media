export type Banner = {
  id: number;
  slug: string;
  acf: {
    Banner: string;
  };
};

export class RepoBanners {
  url = 'https://api.iconomedia.co//wp-json/wp/v2/banners';

  async getBanners(): Promise<Banner[]> {
    const url = this.url;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    const items = await response.json();

    return items;
  }
}
