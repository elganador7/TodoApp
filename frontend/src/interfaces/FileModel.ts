import { UserModel, emptyUserModel } from "./UserModel"
import { MemberModel, emptyMemberModel } from "./MemberModel"
import { CaseModel, emptyCaseModel } from "./CaseModel"

export interface FileModel {
    uuid: string
	created_at: string
    name : string
    bucket : string
    type : string 
    derog : boolean
    description : string
    classification : string
    dissemination : string
    
    user : UserModel
    member : MemberModel
    case : CaseModel
}

export const emptyFileModel : FileModel = {
    uuid: '',
	created_at: '',
    name : '',
    bucket : '',
    type : '', 
    derog : false,
    description : '',
    classification : '',
    dissemination : '',

    user : emptyUserModel,
    member : emptyMemberModel,
    case : emptyCaseModel,
}


