import { ResultPage } from "../pages/Result";
import { StepContactsPage } from "../pages/steps/StepContacts";
import { StepFilesPage } from "../pages/steps/StepFiles";
import { StepNamePage } from "../pages/steps/StepName";

export enum ROUTE_NAMES {
  STEP_NAME = "/",
  STEP_CONTACTS = "/contacts",
  STEP_FILES = "/files",
  RESULT = "/result",
}

export const routes = [
  {path: ROUTE_NAMES.STEP_NAME, Component: StepNamePage},
  {path: ROUTE_NAMES.STEP_CONTACTS, Component: StepContactsPage},
  {path: ROUTE_NAMES.STEP_FILES, Component: StepFilesPage},
  {path: ROUTE_NAMES.RESULT, Component: ResultPage},
]