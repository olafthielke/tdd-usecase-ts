import RegisterCustomerUseCase from "../src/RegisterCustomerUseCase";
import { MissingFirstName } from "../src/errors";


describe("When call register()", () => {

    it("without customer.firstname, Then throw MissingFirstName error.", () => {
        const usecase = new RegisterCustomerUseCase();
        const register = () => usecase.register({ });
        verifyThrowMissingFirstName(register);
    });

    
    function verifyThrowMissingFirstName(register: () => void) {
        expect(register).toThrow(new MissingFirstName());
        expect(register).toThrow("Missing first name.");
    }    
});
