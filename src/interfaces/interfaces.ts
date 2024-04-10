export interface LoginData{
  email:string,
  password:string
}

export interface LoginResponseData{
  msg:string,
  status: number,
  token: string
}

export interface usersData{
  status:string,
  data: any,
  count:number
}

export interface templateResponse
{
  msg:string,
  data?: TemplateData[]
}

export interface singleTemplateRespone{
  msg:string,
  data?: TemplateData
}

export interface TemplateData{
  et_id: number,
  et_name:string,
  et_slug: string,
  et_data: string,
  et_subject: string
}

interface UpdateResponse{
  msg : string
}

export interface  UpdateEmailTemplateData{
  subject:string,
  body:string
}
