export function areListsEqual(list1: string[], list2: string[]): boolean {
  if (list1.length !== list2.length) {
    return false;
  }

  const set1 = new Set(list1);
  const set2 = new Set(list2);

  for (const item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }

  return true;
}

export function convertExperienceLevelToSegment(
  experienceLevel: "Intern" | "Junior" | "Mid-Level" | "Senior",
): string {
  const map = {
    Intern: "e536533e-31c0-4fd1-be01-7b5f082b214c",
    Junior: "5d1e737f-3a54-4a1a-a013-d5873bc761d5",
    "Mid-Level": "72d8e8ec-4420-4dd4-8847-4da5fb58d1cf",
    Senior: "72d8e8ec-4420-4dd4-8847-4da5fb58d1cf",
  };

  return map[experienceLevel];
}
