export interface Item {
  __typename: any;
  price: number;
  name: string;
  image: any;
  description: string;
}

export interface Collection {
  name: string;
  items: Item[];
  image: any;
}

export interface CollectionData {
  getHomeCollection: Collection;
}

export interface CollectionDataAll {
  getAllCollection: Collection[];
}

export interface ItemDataNewArrivals {
  getNewArrivals: Item[];
}

export interface ItemDataAll {
  getAllItem: Item[];
}
