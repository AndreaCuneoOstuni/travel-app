//Import the js file to test
import { checkInput } from "../src/client/js/checkInput"

describe("Testing the validation functionality", () => {

    test("Testing the updateUI() function", () => {

        expect(checkInput).toBeDefined();
    })

});