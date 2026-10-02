import { describe, expect, it } from "vitest";
import { validateRegisterForm, validateSchoolCode } from "./validation";

const valid = ["Sam Lee", "sam@example.org", "Passw0rd", "Passw0rd"] as const;

describe("validateRegisterForm", () => {
    it("accepts a complete form with no school code", () => {
        expect(validateRegisterForm(...valid)).toEqual({ isValid: true, errors: {} });
    });

    it("accepts a short real name, as the server does", () => {
        expect(validateRegisterForm("Sam", valid[1], valid[2], valid[3]).isValid).toBe(true);
    });

    it("rejects a name of one character or only spaces", () => {
        expect(validateRegisterForm("S", valid[1], valid[2], valid[3]).errors.name).toBeTruthy();
        expect(validateRegisterForm("   ", valid[1], valid[2], valid[3]).errors.name).toBeTruthy();
    });

    it("rejects mismatched passwords", () => {
        expect(validateRegisterForm(valid[0], valid[1], valid[2], "Passw0rd!").errors.confirmPassword).toBeTruthy();
    });

    it("reports a malformed school code against its own field", () => {
        const result = validateRegisterForm(...valid, "ab");
        expect(result.isValid).toBe(false);
        expect(Object.keys(result.errors)).toEqual(["schoolCode"]);
    });
});

describe("validateSchoolCode", () => {
    it("treats a blank code as fine, because the field is optional", () => {
        expect(validateSchoolCode("")).toBe("");
        expect(validateSchoolCode("   ")).toBe("");
    });

    it("accepts a code however a student types it", () => {
        expect(validateSchoolCode("WESTMS")).toBe("");
        expect(validateSchoolCode(" west-ms 24 ")).toBe("");
    });

    it("rejects punctuation and codes that are too short", () => {
        expect(validateSchoolCode("ab")).not.toBe("");
        expect(validateSchoolCode("west_ms!")).not.toBe("");
    });
});
