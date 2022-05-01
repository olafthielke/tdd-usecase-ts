export class MissingFirstName extends Error {
    constructor() {
        super("Missing first name.");
    }
}

export class MissingLastName extends Error {
    constructor() {
        super("Missing last name.");
    }
}

export class MissingEmailAddress extends Error {
    constructor() {
        super("Missing email address.");
    }
}

export class DuplicateCustomerEmailAddress extends Error {
    constructor(email: string) {
        super(`Customer with email address '${email}' already exists.`);
    }
}
