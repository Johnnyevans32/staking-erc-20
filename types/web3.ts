export interface ContractSetup {
  address: string;
  interface: any[];
}

export interface Asset {
  id: number;
  name: string;
  logo: string;
  website: string;
  pool: number;
  addressName?: string;
}
