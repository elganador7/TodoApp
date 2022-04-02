import { GroupModel, emptyGroupModel } from './GroupModel'
import { UnitModel, emptyUnitModel } from './UnitModel'

export interface MemberModel {
    uuid: string
	created_at: string
    roster_num : number
    given_name : string
    status : string
    duty_status : string
    date_of_birth : string
    rank : string
    duty_position : string
    coy : string
    unit: string

    ana_id : string
    taskera : string
    bid : string

    fathers_name : string
    ethnicity : string
    home_province : string
    home_district : string
    home_village : string
    birth_province : string
    birth_district : string
    birth_village : string

    cell_number_1 : string
    cn1_date_reported : string
    cell_number_2 : string
    cn2_date_reported : string

    social_media_account1 : string
    social_media_account2 : string
    ahmrs : string
    sofex_case_number : string
    date_last_enrolled : string
    date_screened : string
    recommend : string
    revetting_date : string
    actions_taken : string

    tasked_group_id : string
    tasked_group : GroupModel

    assigned_unit_id : string
    assigned_unit : UnitModel

    reason : string
}

export const emptyMemberModel: MemberModel = {
	uuid: '',
	created_at: '',
    roster_num : 0,
    given_name : '',
    status : '',
    duty_status : '',
    date_of_birth : '',
    rank : '',
    duty_position : '',
    coy : '',
    unit: '',

    ana_id : '',
    taskera : '',
    bid : '',

    fathers_name : '',
    ethnicity : '',
    home_province : '',
    home_district : '',
    home_village : '',
    birth_province : '',
    birth_district : '',
    birth_village : '',

    cell_number_1 : '',
    cn1_date_reported : '',
    cell_number_2 : '',
    cn2_date_reported : '',

    social_media_account1 : '',
    social_media_account2 : '',
    ahmrs : '',
    sofex_case_number : '',
    date_last_enrolled : '',
    date_screened : '',
    recommend : '',
    revetting_date : '',
    actions_taken : '',

    tasked_group_id : '',
    tasked_group : emptyGroupModel,

    assigned_unit_id : '',
    assigned_unit : emptyUnitModel,

    reason : '',
}