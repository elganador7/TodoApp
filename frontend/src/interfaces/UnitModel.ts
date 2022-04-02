import { GroupModel } from './GroupModel'
import { MemberModel } from './MemberModel'

export interface UnitModel {
	uuid: string
	created_at: string
	name: string
    poc : string
    members: MemberModel[]
    groups: GroupModel[]

}


export const emptyUnitModel : UnitModel = {
	uuid: '',
	created_at: '',
	name: '',
    poc : '',
    members: [],
    groups: [],
}
