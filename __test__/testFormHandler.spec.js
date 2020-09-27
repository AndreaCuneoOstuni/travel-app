//Import the js file to test
import { formHandler } from "../src/client/js/formHandler"

describe("Testing the submit functionality", () => {

    test("Testing the formHandler() function", () => {

        expect(formHandler).toBeDefined();
    })
});