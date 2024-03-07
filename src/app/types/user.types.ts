export interface IUser {
  _id?:string,
    first_name: FormDataEntryValue | null;
    last_name: FormDataEntryValue | null;
    avatar: File | null;
    age: number;
    role: FormDataEntryValue | null | string;
    image?: string | undefined;
    username:FormDataEntryValue | null
    description:FormDataEntryValue | null
    password:FormDataEntryValue | null
  }
export interface IUserGet {
  _id?:string,
    first_name: string;
    last_name: string;
    avatar: string;
    age: number;
    role: string ;
    image?: string;
    username:string
    description:string
    password:string
  }
  interface pageInfo{
    limit:number,
    offset:number,
    total:number
  }
  interface dataAll{
    data:IUser,
    pageInfo:pageInfo,
  }

export interface IUserData {
  status:number,
  statusText:string,
  request:any,
  headers:any,
  config:any,
  data:dataAll
}

export interface IUserMe {
  _id?: string;
  first_name: string;
  last_name: string;
  age: number;
  role?: string;
  username?: string;
  password?: string;
  description: string;
  avatar?: string | undefined;
  total_guides?: number;
  todo_guides: number;
  read_guides: number;
}