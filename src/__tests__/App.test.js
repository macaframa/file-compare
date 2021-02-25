import { render, screen } from "@testing-library/react";
import { shallow, configure } from "enzyme";
import { fileSvc } from "../services";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";

configure({ adapter: new Adapter() });

describe("App", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true });
    global.URL.createObjectURL = jest.fn();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("visual", () => {
    test("renders title", () => {
      render(<App />);
      const h4Title = screen.getByText(/Files Uploaded:/i);
      expect(h4Title).toBeInTheDocument();
    });

    test("renders file selector title", () => {
      render(<App />);
      const fileSelector = screen.getByText(/Upload a CSV file/i);
      expect(fileSelector).toBeInTheDocument();
    });

    test("renders file selector", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find('input[type="file"]').exists()).toBe(true);
    });
  });

  describe("interaction", () => {
    beforeEach(() => {
      fetch.mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => {
            return Promise.resolve({
              "1_@email.com": {
                channel: {
                  original: "UC123",
                  updated: "123",
                },
                count: {
                  original: 3,
                  updated: 3,
                },
              },
              "2_@email.com": {
                channel: {
                  original: "UC456",
                  updated: "456",
                },
                count: {
                  original: 3,
                  updated: 3,
                },
              },
              "3_@email.com": {
                channel: {
                  original: "876",
                  updated: "876",
                },
                count: {
                  original: 3,
                  updated: 3,
                },
              },
            });
          },
        });
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("click file selector: api call to /normalize and update view with one file uploaded", () => {
      const file = new File([require("./1.csv")], "1.csv", {
        type: "text/csv",
      });
      const input = wrapper.find('input[type="file"]');
      input.simulate("change", {
        target: {
          files: [file],
        },
      });
      expect(wrapper.html()).toContain("<span>1.csv</span>");
    });

    test("click file selector: api call to /normalize and update view with two files uploaded", () => {
      const file1 = new File([require("./1.csv")], "1.csv", {
        type: "text/csv",
      });
      const file2 = new File([require("./2.csv")], "2.csv", {
        type: "text/csv",
      });
      const input = wrapper.find('input[type="file"]');
      input.simulate("change", {
        target: {
          files: [file1],
        },
      });
      // had to take a second snapshot after render even though its the same element.
      const input2 = wrapper.find('input[type="file"]');
      input2.simulate("change", {
        target: {
          files: [file2],
        },
      });
      const html = wrapper.html();
      expect(html).toContain(
        '<h3>Concerns<small>(optional)</small></h3><form></form><br/><button class="App__file-upload-card__submit">submit</button>'
      );
      expect(html).toContain("<span>1.csv, </span><span>2.csv</span>");
    });
  });
});
