import { GroupModel } from './GroupModel'
import { MemberModel } from './MemberModel'

export interface UserModel {
	created_at: string
	is_active: boolean
    group_admin : boolean
    group_uuid: string
    groups: GroupModel[]
    working_members: MemberModel[]
    write_privileges : boolean
	username: string
	uuid: string
}

export const emptyUserModel: UserModel = {
	created_at: '',
	is_active: false,
    group_admin : false,
    group_uuid: '',
    groups: [],
    working_members: [],
    write_privileges : false,
	username: '',
	uuid: '',
}
