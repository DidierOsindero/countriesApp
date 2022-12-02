import { addID } from "./addID";

test("addID adds an ID property to every item in a CountryData array", () => {
  expect(
    addID([
      {
        name: "string",
        capital: "string",
        continent: "string",
        population: "string",
        languages: [{ name: "string" }],
        flags: { bigFlag: "imgSrc" },
        region: "string",
        numericCode: "170",
      },
    ])
  ).toStrictEqual([
    {
      name: "string",
      capital: "string",
      continent: "string",
      population: "string",
      languages: [{ name: "string" }],
      flags: { bigFlag: "imgSrc" },
      region: "string",
      numericCode: "170",
      id: 1,
    },
  ]);
});
