export class LocalStorage {
  static get<T>(key: string): T | null {
    return JSON.parse(localStorage.getItem(key)!);
  }

  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static clearAll() {
    localStorage.clear();
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
