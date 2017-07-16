import { Authors } from './authors';

export class Books { 
	constructor(public title?: string, 
							public authors?: Authors[],
							public pages?: number,
							public publishingHouse?: string,
							public yearOfPublication?: number,
							public releaseDate?: string,
							public ISBN?: string,
							public imgSrc?: string) {}
}