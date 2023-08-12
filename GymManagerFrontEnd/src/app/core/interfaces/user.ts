export interface User {
    email:string;
    password:string;
    phoneNumber:string;
}
export interface signIn{
    email:string;
    password:string;
}
// response-model.interface.ts
export interface SignInResponseModel {
    hasError: boolean;
    message: string;
    model: {
      accessToken: string;
    };
    requestId: string;
  }
  

