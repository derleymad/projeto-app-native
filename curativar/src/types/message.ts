export interface IMessage{
  "id": number,
  "attributes": {
    "publishedAt": string,
    "message": string,
    "users_permissions_user": {
      "data": {
        "id": number,
        "attributes": {
          "name": string,
          "profile_pic": {
            "data": {
              "attributes": {
                "formats": {
                  "thumbnail": {
                    "url": string,
                  },
                },
              }
            }
          }
        }
      }
    }
  }
}