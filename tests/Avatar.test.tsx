/* tslint:disable */
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import { Avatar } from "../src/Components/Avatar";

beforeEach(() => {
  //@ts-ignore
  global.fetch = jest.fn().mockImplementation(() => {
    let p = new Promise((res,rej) => {
      res({
        status: 200,
        blob: () => new Promise((res,rej) => {
          res('BLOBDATA');
        })
      });
    });
    return p;
  });
  //@ts-ignore
  global.URL.createObjectURL = jest.fn().mockImplementation((a) => { 
    return a;
  });
});

describe("Avatar", () => {
  it("Renderds like a boss", async (done) => {
    let avatar;
    act(() => {
      avatar = mount(<Avatar url="https://url-of-your-server.com/example/json" size={{ width: 50, height: 50 }} />);
    });

    //@ts-ignore
   expect(global.fetch).toHaveBeenCalledTimes(1);   
    //@ts-ignore
   expect(avatar).toMatchSnapshot();
    //@ts-ignore
    global.fetch.mockClear();
    done();
  }); 
});
