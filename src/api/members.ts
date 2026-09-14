import { Member } from '../model/entity';

export class RepoMembers {
  url = 'https://api.iconomedia.co/wp-json/wp/v2/integrantes?per_page=100';

  async getMembers(): Promise<Member[]> {
    const response = await fetch(this.url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    const items = await response.json();

    return items;
  }
}
