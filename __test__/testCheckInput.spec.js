//Import the js file to test
import { checkInput } from "../src/client/js/checkInput"

describe("Testing the validation functionality", () => {

    test("Testing the checkInput() function", () => {
        expect(checkInput('', '')).toContain("Please select a date and destination")
    })

    test("Testing the checkInput() function", () => {
        // expect(checkInput('rome', '')).toContain("Please select a date and destination")
        expect(checkInput('rome', '')).toBe(value: false, message: "Please select a date and destination"})
    })

    test("Testing the checkInput() function", () => {
        expect(checkInput('', '2020-10-02')).toContain("Please select a date and destination")
    })

    test("Testing the checkInput() function", () => {
        expect(checkInput('ro3e', '')).toContain("Please select a valid destination")
    })

});