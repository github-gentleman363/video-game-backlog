const TO_DO = "TO_DO";
const IN_PROGRESS = "IN_PROGRESS";
const DONE = "DONE";

export const BACKLOG_COLUMN_TYPE = Object.freeze({ TO_DO, IN_PROGRESS, DONE });

export const BACKLOG_COLUMN_TYPE_TO_DISPLAY_LABEL = Object.freeze({ [TO_DO]: "To Do", [IN_PROGRESS]: "In Progress", [DONE]: "Done" });