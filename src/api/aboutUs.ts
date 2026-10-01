export type AboutUsEntry = {
  id: number;
  slug: string;
  acf: {
    title: string;
    description: string;
    list: string;
    image1: string;
    image2: string;
    image3: string;
    indice: string;
  };
};

export class RepoAboutUs {
  url = 'https://api.iconomedia.co//wp-json/wp/v2/aboutus-page';

  async getEntries(): Promise<AboutUsEntry[]> {
    const url = this.url;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    const items = await response.json();

    return items;
  }
}
