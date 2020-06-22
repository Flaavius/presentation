import { imageCache } from "../src/utils/imageCache";

const images: Array<{ id: number, url: string}> = [
  {
    id: 0,
    url: "url-0",
  },
  {
    id: 1,
    url: "url-1",
  },
  {
    id: 2,
    url: "url-2",
  },
  {
    id: 3,
    url: "url-3",
  },
  {
    id: 4,
    url: "url-4",
  },
  {
    id: 5,
    url: "url-5",
  },
];

describe("IMAGE CACHE", () => {
  images.forEach((e) => {
    imageCache.add(e.id, e.url);
  });
  it("Returns url-1 base on id 1", () => {
    expect(imageCache.get(1)).toBe("url-1");
  });
  it("Returns url-5 base on id 5", () => {
    expect(imageCache.get(5)).toBe("url-5");
  });
  it("returns false when url is not cached", () => {
    expect(imageCache.isCached(6)).toBeFalsy();
  });
  it("returns empty string when no url is found", () => {
    expect(imageCache.get(6)).toBe("");
  });

  it("returns false since 5 has been removed", () => {
    imageCache.remove(5);
    expect(imageCache.isCached(5)).toBeFalsy();
  });
});
