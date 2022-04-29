import RegisterCustomerUseCase from "../src/RegisterCustomerUseCase";
import { MissingFirstName } from "../src/errors";


describe("When construct RegisterCustomerUseCase", () => {
    
    it("Then can construct RegisterCustomerUseCase.", () => {
        const usecase = new RegisterCustomerUseCase();
    });
});

describe("When call register()", () => {

    it("without customer.firstname, Then throw MissingFirstName error.", () => {
        const usecase = new RegisterCustomerUseCase();
        const register = () => usecase.register({ });
        expect(register).toThrow(new MissingFirstName());
    });
});

