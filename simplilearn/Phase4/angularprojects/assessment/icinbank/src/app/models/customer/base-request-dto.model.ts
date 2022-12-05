import { Operation } from "../common/operation.model";

export interface BaseRequestDto 
{
      requestId:any; 
      userId:any;
      password:any;
      branchId:any;       
	remarks:any;
	requestStatus:any;
      requestDate:Date;
	authToken:any;
      bankOperations:Operation[];
}
