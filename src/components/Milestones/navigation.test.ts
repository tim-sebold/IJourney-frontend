import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** Every page that takes part in the course chain, as [label, source]. */
const pages = (): Array<[string, string]> => {
    const found: Array<[string, string]> = [];

    const milestones = path.join(SRC, "components/Milestones");
    for (const group of readdirSync(milestones)) {
        if (!/^Milestone\d+$/.test(group)) continue;
        for (const file of readdirSync(path.join(milestones, group))) {
            if (!/^Milestone\d+\.tsx$/.test(file)) continue;
            found.push([`${group}/${file}`, readFileSync(path.join(milestones, group, file), "utf8")]);
        }
    }

    const intro = path.join(SRC, "pages/Milestone/Introduction");
    for (const file of ["IAM.tsx", "StartingStatement.tsx"]) {
        found.push([`Introduction/${file}`, readFileSync(path.join(intro, file), "utf8")]);
    }

    return found;
};

describe("milestone pages", () => {
    // Thirty-four pages used to toast the error and then navigate anyway, so a
    // failed save or a refused unlock still moved the student on — with the step
    // left incomplete and nothing to say so until the certificate was refused.
    it.each(pages())("%s only moves on when the save and unlock succeeded", (_label, source) => {
        expect(source).not.toMatch(/\}\s*catch\s*(\([^)]*\))?\s*\{[^{}]*\}\s*navigate\(/);
    });

    // A 404 on first visit is the normal path. `getMilestone` resolves to null for
    // it, so a page must not reach into the result without checking.
    it.each(pages())("%s tolerates having nothing saved yet", (_label, source) => {
        const unguarded = [...source.matchAll(/const (\w+) = await getMilestone\([^)]*\);/g)]
            .map(([, name]) => name)
            .filter((name) => new RegExp(`\\b${name}\\.responses`).test(source) &&
                !new RegExp(`if\\s*\\(\\s*!?${name}\\b`).test(source));

        expect(unguarded).toEqual([]);
    });
});
