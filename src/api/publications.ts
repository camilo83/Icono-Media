import { Publication } from '../model/entity';

export class RepoPublications {
  url = 'https://api.iconomedia.co//wp-json/wp/v2/publicaciones';

  async getPublications(): Promise<Publication[]> {
    const url = this.url;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    const items = await response.json();

    return items;
  }
}
