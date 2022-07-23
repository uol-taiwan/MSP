/**
 * 
 *     <!-- <script
      type="text/javascript"
      src="{{ url_for('Scripts', filename='drag.js') }}"
    ></script>
    <script
      type="text/javascript"
      src="{{ url_for('Scripts', filename='index.js') }}"
    ></script>
    <script
      type="text/javascript"
      src="{{ url_for('Scripts', filename='progression.js') }}"
    ></script> -->
 * 
 */

/** Progression Rule in plain English
 *
 *    LEVEL 4 TO LEVEL 5
 * 1. 45 credits awarded including ITP1 and DM/CM
 * 2. 30 credits attempted including ITP2
 * 3. registered remaining unattempted level 4 modules excluding unavailable math modules
 *
 *    LEVEL 5 TO LEVEL 6
 * 1. 45 credits awarded including OOP or SDD
 * 2. 45 credits attempted including OOP or SDD
 * 3. registered remaining unattempted level 5 modules
 *
 *    LEVEL 6 TO FINAL PROJECT
 * 1. all modules in level 4 & 5 credits awarded (or exhausted attempts)
 * 2. 60 credits attempted at level 6
 *
 */

/** Progression Rule in attempted technical logic
 *
 * =============================================================
 *
 *    LEVEL 4 TO LEVEL 5
 *
 * 0. If planning-modules exist class(level-5)
 *    if (level5Plan.length !== 0) {}
 *
 * 1. Check if credit-modules have ITP1 and DM/CM
 * 1.1 Check if credit-modules have more than 45 credits (3 elements of level-4)
 *     if (selectCredit.includes('CM1005: ITP1') &&
 *        (selectCredit.includes('CM1015: CM') || selectCredit.includes('CM1020: DM'))
 *        ) {
 *          if (level4Credit.length > 2) {}
 *      }
 *
 * 2. Check if attempt-modules have ITP2
 * 2.1 Check if attempt-modules have more than 30 credits (2 elements of level-4)
 *     if (selectAttempt.includes('CM1010: ITP2')) {
 *       if (level4Attempt.length > 1) {}
 *     }
 *
 * 3. Check if planning-modules have the remaining level-4 (or the opposite, check if there are remaining level-4 in the unselected list)
 * 3.1? Math situation (Apr/Oct term decision)
 *    if (level4Unselected.length == 0) {}
 *
 * =============================================================
 *
 *    LEVEL 5 TO LEVEL 6
 *
 * 0. If planning-modules exist class(level-6)
 *    if (level6Plan.length !== 0) {}
 *
 * 1. Check if credit-modules have OOP or SDD
 * 1.1 Check if credit-modules have more than 45 credits (3 elements of level-5)
 *     if (selectCredit.includes('CM2005: OOP') || selectCredit.includes('CM2010: SDD')) {
 *          if (level5Credit.length > 2) {}
 *      }
 *
 * 2. Check if attempt-modules have OOP or SDD
 * 2.1 Check if attempt-modules have more than 45 credits (3 elements of level-5)
 *     if (selectAttempt.includes('CM2005: OOP') || selectAttempt.includes('CM2010: SDD')) {
 *          if (level5Attempt.length > 2) {}
 *      }
 *
 * 3. Check if planning-modules have remaining level-4 or level-5 (check the opposite, if there are remaining level-4 and level-5 in the unselected list)
 *    if (level4Unselected.length == 0 && level5Unselected.length == 0) {}
 *
 * =============================================================
 *
 *    LEVEL 6 TO FINAL PROJECT
 *
 * 0. If planning-modules exist CM3070: Final Project
 *    if (level6Plan.includes('CM3070: Final Project')) {}
 *
 * 1. Check if there's any remaining level-4 and level-5
 *    if (level4Unselected.length == 0 && level5Unselected.length == 0) {}
 *
 * 2. Check if credit-modules or attempt-modules have a total of 60 credits (4 elements of level-6)
 *    if (level6Credit.length + level6Attempt.length >= 4) {}
 *
 *
 */

/** Trigger when button clicked */
function recommendation() {
  // output the current selection in the console
  console.log(moduleSelection);

  const suggestion = document.getElementById("suggestion-message");
  // All the current modules unselected
  const unselected = document
    .getElementById("all_modules")
    .outerText.split("\n");
  // level 4 modules unselected
  const level4Unselected = document.querySelectorAll(
    "div#all_modules > div.level-4"
  );
  // level 5 modules unselected
  const level5Unselected = document.querySelectorAll(
    "div#all_modules > div.level-5"
  );
  // level 6 modules unselected
  const level6Unselected = document.querySelectorAll(
    "div#all_modules > div.level-6"
  );

  // level 4 modules in credit-modules (array)
  const level4Credit = document.querySelectorAll(
    "div#credit-modules > div.level-4"
  );
  // level 5 modules in credit-modules (array)
  const level5Credit = document.querySelectorAll(
    "div#credit-modules > div.level-5"
  );
  // level 6 modules in credit-modules (array)
  const level6Credit = document.querySelectorAll(
    "div#credit-modules > div.level-6"
  );

  // level 4 modules in attempt-modules (array)
  const level4Attempt = document.querySelectorAll(
    "div#attempt-modules > div.level-4"
  );
  // level 5 modules in attempt-modules (array)
  const level5Attempt = document.querySelectorAll(
    "div#attempt-modules > div.level-5"
  );
  // level 6 modules in attempt-modules (array)
  const level6Attempt = document.querySelectorAll(
    "div#attempt-modules > div.level-6"
  );

  // level 4 modules in planning-modules (array)
  const level4Plan = document.querySelectorAll(
    "div#planning-modules > div.level-4"
  );
  // level 5 modules in planning-modules (array)
  const level5Plan = document.querySelectorAll(
    "div#planning-modules > div.level-5"
  );
  // level 6 modules in planning-modules (array)
  const level6Plan = document.querySelectorAll(
    "div#planning-modules > div.level-6"
  );

  // modules in each container (array)
  const selectCredit = moduleSelection["credit-modules"];
  const selectAttempt = moduleSelection["attempt-modules"];
  const selectPlanning = moduleSelection["planning-modules"];

  function level4to5test() {
    if (
      selectCredit.includes("CM1005: ITP1") &&
      (selectCredit.includes("CM1015: CM") ||
        selectCredit.includes("CM1020: DM")) &&
      level4Credit.length > 2 &&
      (selectAttempt.includes("CM1010: ITP2") ||
        selectCredit.includes("CM1010: ITP2")) &&
      (level4Attempt.length > 1 || level4Credit.length == 8) &&
      level4Unselected.length == 0
    ) {
      suggestion.innerHTML = "You have passed the L4 to L5 test.";
    } else {
      suggestion.innerHTML = "You have failed the L4 to L5 test.";
    }
  }

  function level5to6test() {
    if (
      (selectCredit.includes("CM2005: OOP") ||
        selectCredit.includes("CM2010: SDD")) &&
      level5Credit.length > 2 &&
      (selectAttempt.includes("CM2005: OOP") ||
        selectCredit.includes("CM2005: OOP")) &&
      (selectAttempt.includes("CM2010: SDD") ||
        selectCredit.includes("CM2010: SDD")) &&
      level5Attempt.length > 2 &&
      level4Unselected.length == 0 &&
      level5Unselected.length == 0
    ) {
      suggestion.innerHTML = "You have passed the L5 to L6 test.";
    } else {
      suggestion.innerHTML = "You have failed the L5 to L6 test.";
    }
  }

  function level6toFPtest() {
    if (
      level4Unselected.length == 0 &&
      level5Unselected.length == 0 &&
      level6Credit.length + level6Attempt.length >= 4
    ) {
      suggestion.innerHTML = "You have passed the Final Project test";
    }
  }

  // User picked level 5 modules to take, start the checking process
  if (level5Plan.length !== 0) {
    level4to5test();
  }

  // User picked level 6 modules to take
  else if (
    level6Plan.length !== 0 &&
    !selectPlanning.includes("CM3070: Final Project")
  ) {
    level5to6test();
  }

  // User picked Final Project
  else if (selectPlanning.includes("CM3070: Final Project")) {
    level6toFPtest();
  } else {
    suggestion.innerHTML = "You did not select any modules to take next term.";
  }
}
