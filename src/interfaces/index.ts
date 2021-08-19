// Users
export interface IClients {
    id: string;
    name: boolean;
    firstname: boolean;
    address: string;
    created: string;
    birthday: string;
    accounts: IAccounts[];
}

// Accounts
export interface IAccounts {
    account_id: string;
}

// All Account Types
export interface IAccountTypes {
    id: string;
    card_type: string;
    number: number;
    balance:number;
    created: string;
}

// Line Chart Series Data 
export interface ISeriesData {
    name: string;
    data: number[];
    color: string;
}