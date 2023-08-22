import axios from "axios";
import SnackOrBoozeApi from "./Api";
import { newDrink, fakeError } from "./testingSeed/fakeData.js";

test("getItems success", async function () {
  axios.get = jest.fn(() => ({
    data: ["testing"],
  }));

  const result = await SnackOrBoozeApi.getItems();
  expect(result).toEqual(["testing"]);
  expect(axios.get).toHaveBeenCalled();
});

test("getItems error", async function () {
  axios.get = jest.fn(() => Promise.reject(fakeError));

  try {
    await SnackOrBoozeApi.getItems();
    throw new Error("wrong error");
  }
  catch (err) {
    expect(axios.get).toHaveBeenCalled();
    expect(err).toEqual(`Location: nope.com, status: nope status`);
  }
});

test("addItem success", async function () {
  axios.post = jest.fn(() => ({
    data: { fakeItemName: "testing" },
  }));

  const result = await SnackOrBoozeApi.addItem(newDrink);
  expect(result).toEqual({ fakeItemName: "testing" });
  expect(axios.post).toHaveBeenCalled();
});

test("addItem error", async function () {
  axios.post = jest.fn(() => Promise.reject(fakeError));

  try {
    await SnackOrBoozeApi.addItem(newDrink);
    throw new Error("wrong error");
  }
  catch (err) {
    expect(axios.post).toHaveBeenCalled();
    expect(err).toEqual(`Location: nope.com, status: nope status`);
  }
});