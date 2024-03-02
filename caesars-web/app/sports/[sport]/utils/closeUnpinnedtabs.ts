export const closeAllUnpinnedTabs = (sportName: string) => {
  let tab = localStorage.getItem('tab');
  if (tab) {
    const t = JSON.parse(tab);
    const updatedTabs = t.map((t: any) => {
      if (t.sport === sportName) {
        const newTab = t.tabs.filter((t: any) => t.isPinned === true);
        return { ...t, tabs: newTab };
      } else return { ...t };
    });

    localStorage.setItem('tab', JSON.stringify(updatedTabs));

    const filters = updatedTabs.filter((t: any) => t.sport === sportName);
    return filters[0].tabs;
  }
};
