import { IMessage } from "./message"

export interface IMessageResponse{
	"data": IMessage[],
	"meta": {
		"pagination": {
      "page": number,
      "pageSize": number,
      "pageCount": number,
      "total": number
		}
	}
}