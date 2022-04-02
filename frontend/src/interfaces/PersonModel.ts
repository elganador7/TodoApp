export interface PersonModel {
	uuid: string
	created_at: string
	name: string
    phone_number : string
    latitude : string
    longitude : string

}

export const emptyPersonModel: PersonModel = {
	uuid: '',
	created_at: '',
	name: '',
    phone_number: '',
    latitude: '',
    longitude: '',
}