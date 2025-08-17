import { checkDarkMode } from "./settingsUtils/checkDarkMode.js";
import { checkToggleBtn } from "./settingsUtils/checkToggles.js";
import { updateInputPlaceholder } from "./settingsUtils/UpdateInputButton.js";
import { applySetting } from "./settingsUtils/saveSettings.js";

function initializeSettingsPage() {
  checkToggleBtn();
  checkDarkMode();
  updateInputPlaceholder();
  applySetting()
}

initializeSettingsPage();


