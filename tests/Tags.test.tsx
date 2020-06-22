import React from "react";
import { shallow } from "enzyme";

import { Tags, ITag } from "../src/Components/Tags";

const tagsTemplate: ITag[] = [
  {
    title: "This",
    url: "http://this",
  },
  {
    title: "is",
    url: "http://is",
  },
  {
    title: "a",
    url: "http://a",
  },
  {
    title: "test",
    url: "http://test",
  },
];

describe("Tags", () => {
  const tag = shallow(<Tags tags={tagsTemplate} />);
  it("passes props correctly", () => {
    expect(tag.props()).toMatchSnapshot();
  });
  it("Renders with appropriate tags", () => {
    expect(tag).toMatchSnapshot();
  });
});
