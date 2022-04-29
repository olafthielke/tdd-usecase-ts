import RegisterCustomerUseCase from "../src/RegisterCustomerUseCase";
import { MissingFirstName } from "../src/errors";


describe("When call register()", () => {

    it("without customer.firstname, Then throw MissingFirstName error.", () => {
        const usecase = new RegisterCustomerUseCase();
        const register = () => usecase.register({ });
        expect(register).toThrow(new MissingFirstName());
    });
});

