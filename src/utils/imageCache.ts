class ImageCache {
  private map: Map<number, string>;
  constructor() {
    this.map = new Map();
  }

  public add(id: number, url: string): void {
    this.map.set(id, url);
  }
  public remove(id: number): void {
    this.map.delete(id);
    return;
  }
  public get(id: number): string {
    if (this.map.has(id))
      return this.map.get(id) || "";
    return "";
  }

  public isCached = (id: number): boolean =>  this.map.has(id);
}

export const imageCache = new ImageCache();
