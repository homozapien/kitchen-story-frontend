import { Operation } from "../common/operation.model";
import { BaseRequestDto } from "./base-request-dto.model";

export class BasicMasterProfileDto implements BaseRequestDto {
    requestId: any;
    userId: any;
    password: any;
    branchId: any;
    remarks: any;
    requestStatus: any;
    requestDate!: Date;
    authToken: any;
    bankOperations:Operation[] = [];
    
    constructor(public firstName:any, public lastName:any, public email:any, public phone:any)
    {

    }
    

}
