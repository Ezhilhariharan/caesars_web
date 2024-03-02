export const onPin = (d: any, sportName: string) => {
  let tab = localStorage.getItem('tab');
  if (tab) {
    let updatedTab1: any = null;
    let updatedTab2: any = null;

    const t = JSON.parse(tab);
    const pinedTabs = t.map((t: any) => {
      if (t.sport === sportName) {
        const newTabs = t.tabs.filter((t: any) => t.matchId !== d.matchId);
        if (!d.isPinned) {
          updatedTab1 = { ...t, tabs: [{ ...d, isPinned: true }, ...newTabs] };
          return { ...t, tabs: [{ ...d, isPinned: true }, ...newTabs] };
        } else {
          updatedTab2 = { ...t, tabs: [...newTabs, { ...d, isPinned: false }] };
          return { ...t, tabs: [...newTabs, { ...d, isPinned: false }] };
        }
      } else return t;
    });
    localStorage.setItem('tab', JSON.stringify(pinedTabs));
    const filters = pinedTabs.filter((t: any) => t.sport === sportName);
    return filters[0].tabs;
  }
};
