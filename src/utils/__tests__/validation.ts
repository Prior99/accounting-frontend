import { validateEMail, validatePassword } from "..";

["test@example.com", "frederick@gnodtke.net"].forEach(email => {
    test(`\`validateEMail()\` detects "${email}" as valid`, () => {
        expect(validateEMail(email)).toBe(true);
    });
});

["test@example", "sometest", "some test@example.com"].forEach(email => {
    test(`\`validateEMail()\` detects "${email}" as invalid`, () => {
        expect(validateEMail(email)).toBe(false);
    });
});

["12345678", "somegoodpassword"].forEach(password => {
    test(`\`validatePassword()\` detects "${password}" as valid`, () => {
        expect(validatePassword(password)).toBe(true);
    });
});

["", "some", "short"].forEach(password => {
    test(`\`validatePassword()\` detects "${password}" as invalid`, () => {
        expect(validatePassword(password)).toBe(false);
    });
});
