import { headerData, sidebarData } from "./layoutData";

export type RecapStep = {
    /** Progress-form key, e.g. `milestone1/4` — matches the recap payload. */
    key: string;
    title: string;
    href: string;
};

export type RecapGroup = {
    title: string;
    steps: RecapStep[];
};

/** `/milestones/milestone1/4` -> `milestone1/4`. */
const toKey = (url: string) => url.replace("/milestones/", "");

/**
 * The Introduction pages sit outside the sidebar menu but still collect work
 * (the starting statement), so the recap has to carry them itself.
 */
const INTRO_GROUP: RecapGroup = {
    title: "Before You Begin",
    steps: [
        { key: "milestone0/1", title: "I AM: You Are the Journey", href: "/milestones/milestone0/1" },
        { key: "milestone0/2", title: "Your Starting Statement", href: "/milestones/milestone0/2" },
    ],
};

/**
 * The recap's table of contents, derived from the same data the sidebar and header
 * render so a renamed milestone never has to be renamed twice.
 */
export const RECAP_GROUPS: RecapGroup[] = [
    INTRO_GROUP,
    ...sidebarData.milestoneMenus.map((menu, index) => ({
        title: headerData.solutions[index]?.title ?? `Milestone ${index + 1}`,
        steps: menu.map((item) => ({
            key: toKey(item.url),
            title: item.title,
            href: item.url,
        })),
    })),
];
