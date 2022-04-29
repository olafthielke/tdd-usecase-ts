import RegisterCustomerUseCase from "../src/RegisterCustomerUseCase";
import { MissingFirstName, MissingLastName } from "../src/errors";


describe("When call register()", () => {

    it("without customer.firstname, Then throw MissingFirstName error.", () => {
        const usecase = new RegisterCustomerUseCase();
        const register = () => usecase.register({ });
        verifyThrowMissingFirstName(register);
    });

    it("without customer.lastname, Then throw MissingLastName error.", () => {
        const usecase = new RegisterCustomerUseCase();
        const register = () => usecase.register({ firstname: "Fred" });
        expect(register).toThrow(new MissingLastName());
    });


    function verifyThrowMissingFirstName(register: () => void) {
        expect(register).toThrow(new MissingFirstName());
        expect(register).toThrow("Missing first name.");
    }
});
