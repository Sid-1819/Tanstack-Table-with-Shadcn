export interface TableData {

    
    id: number,
    name: string,
    email: string,
    age: number,
    country: string,
    status: 'Active' | 'Inactive'
  }
  
 export  interface TableDataProps {
data : TableData[]
  }