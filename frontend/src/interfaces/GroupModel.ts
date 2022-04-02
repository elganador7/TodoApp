import { UnitModel } from './UnitModel'
import { UserModel } from './UserModel'

export interface GroupModel {
	uuid: string
	created_at: string
	name: string
    role: string
    units: UnitModel[]
    users: UserModel[]
}

export const emptyGroupModel: GroupModel = {
	uuid: '',
	created_at: '',
	name: '',
    role: '',
    units: [],
    users: [],
}