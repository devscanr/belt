import {capitalize} from "./string"

describe("capitalize()", () => {
  test("works", () => {
    expect(capitalize("test")).toMatch("Test")
  })
})
