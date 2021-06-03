declare module 'CustomerTypes' {
  export interface BigEventItem {
    id: string;
    date: string;
    content: { [key: string]: any };
    [attrKey: string]: any;
  }
}
