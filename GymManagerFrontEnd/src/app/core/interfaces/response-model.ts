export interface ResponseModel <T>{
    hasError:string;
    message:string;
    model:T;
    requestId:string;
    }
    
    export interface ResponseArrayModel<T>{
      hasError:string;
      message:string;
      model: T[];
      requestId:string;
    }
    