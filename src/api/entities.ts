import { Entity } from '../model/entity';

export class RepoEntities {
  urls = {
    graphicArts: 'https://api.iconomedia.co//wp-json/wp/v2/graphic-arts',
    editorial: 'https://api.iconomedia.co//wp-json/wp/v2/editorials',
    digitalMedia: 'https://api.iconomedia.co//wp-json/wp/v2/digital-media',
  };

  getUrlForEntity(entity: keyof typeof this.urls): string {
    const url = this.urls[entity];
    if (!url) throw new Error(`URL no definida para la entidad: ${entity}`);
    return url;
  }

  async getItems(entity: keyof typeof this.urls): Promise<Entity[]> {
    const url = this.getUrlForEntity(entity);
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    const items = await response.json();
    return items;
  }

  async getItem(entity: keyof typeof this.urls, slug: string): Promise<Entity> {
    const url = this.getUrlForEntity(entity);

    const response = await fetch(`${url}?slug=${slug}`);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    const item = await response.json();

    return item[0];
  }
}
