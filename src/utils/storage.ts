class Storage {
  private exec: any;
  constructor() {
    this.exec = window.localStorage;
  }
  getType = (val: any) => Object.prototype.toString.call(val).slice(8, -1);
  setItem(key: string, value: any, expired?: number) {
    let data = null;

    if (this.getType(value) === "Object") {
      data = {
        ...value,
      };
    } else {
      data = {
        value,
      };
    }

    if (expired && typeof expired === "number") {
      const expiredTime =
        new Date().getTime() + Number(expired) * 24 * 60 * 60 * 1000;
      data.expired = expiredTime;
    }
    this.exec.setItem(key, JSON.stringify(data));
  }
  getItem(key: string) {
    let item = this.exec.getItem(key);
    try {
      item = JSON.parse(item);
    } catch (error) {}

    if (item.expired && item.expired < new Date().getTime()) {
      this.exec.removeItem(key);
    }
    return item;
  }
  removeItem(key: string) {
    this.exec.removeItem(key);
  }
  clear() {
    this.exec.clear();
  }
}

export default Storage;
