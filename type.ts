export interface Notes {
  find(arg0: (note: any) => boolean): unknown;
  id: number;
  ncategory: string;
  ntitle: string;
  ndescription: string;
  createdAt: string;
}
