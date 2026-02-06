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
