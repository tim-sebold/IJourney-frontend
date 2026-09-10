/**
 * The prompts participants were actually answering.
 *
 * The saved responses only carry field names (`reflection`, `goal`, …), which on
 * their own read as meaningless labels months later. This maps a recap step key
 * and field name back to the question that was on screen, so the recap shows the
 * question above the answer rather than a humanised variable name.
 */
export const RECAP_QUESTIONS: Record<string, Record<string, string>> = {
    'milestone0/2': {
        statement: 'What is your starting statement?',
    },
    'milestone1/6': {
        emotion1: 'Which emotion did you identify first?',
        associateFeeling1: 'What do you associate with that first emotion?',
        emotion2: 'Which second emotion did you identify?',
        associateFeeling2: 'What do you associate with that second emotion?',
    },
    'milestone2/5': {
        reflection: 'How does Emotional Intelligence affect your actions?',
    },
    'milestone2/9': {
        reflection:
            'Think about a time when your character was tested — when you showed courage, faced fear, stood up for your values, or persevered through difficulty. What character traits did you demonstrate?',
    },
    'milestone4/5': {
        reflection:
            'Reflecting on your support network: what is your biggest fear about using it, which contact will you reach out to first and why, and how do you feel about having this support system in place?',
    },
    'milestone5/1': {
        goal: 'What are your educational goals?',
    },
    'milestone7/2': {
        goal: 'What SMART goal did you set?',
        accountabilityPartner: 'Who can be your accountability partner?',
        // Stored under `deadline`, but the page asks about check-ins.
        deadline: 'How will you ask them to hold you accountable?',
    },
    'milestone6/3': {
        journeyerStatement: 'Your Envisioning Your Future Statement',
    },
};

/** The question for a field, if this step asked one. */
export const questionFor = (stepKey: string, fieldKey: string): string | undefined =>
    RECAP_QUESTIONS[stepKey]?.[fieldKey];

/**
 * Render-only fields on saved objects (the Feelings Wheel stores whole emotion
 * nodes, colour and all). None of it is the participant's own writing, so none
 * of it belongs in the recap.
 */
export const HIDDEN_RESPONSE_KEYS = new Set([
    'color',
    'id',
    'level',
    'children',
    'emoji',
    'selected',
]);
