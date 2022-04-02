import { MemberModel, emptyMemberModel } from './MemberModel'

export interface CaseModel {
    uuid: string
	created_at: string
    member : string
    user : string
    open : boolean
    
    date_opened : string
    date_completed : string
    
    reason_for_opening : string
    writeup : string
    decision : string 
    
    member_info_before_case : MemberModel
    member_info_after_case : MemberModel
}

export const emptyCaseModel: CaseModel = {
    uuid: '',
	created_at: '',
    member : '',
    user : '',
    open : false,
    
    date_opened : '',
    date_completed : '',
    
    reason_for_opening : '',
    writeup : '',
    decision : '', 
    
    member_info_before_case : emptyMemberModel,
    member_info_after_case : emptyMemberModel
}