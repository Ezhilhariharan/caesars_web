export function getUserFromLocalstorage() {
  if (typeof window !== "undefined") {
    const userString: any = localStorage.getItem("user");
    if (!userString) return {};
    return JSON.parse(userString);
  }
}
export function getAdminFromLocalstorage() {
  if (typeof window !== "undefined") {
    const userString: any = localStorage.getItem("admin");
    if (!userString) return {};
    return JSON.parse(userString);
  }
}
