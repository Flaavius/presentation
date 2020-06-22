import React from "react";
import { shallow } from "enzyme";

import { Article } from "../src/Components/Article";

describe("Article", () => {
  const article = shallow(<Article title="Hello World" id={2} />);
  it("Renders Article Component", () => {
    expect(article).toMatchSnapshot();
  });
});
