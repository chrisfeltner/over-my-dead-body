// This file is necessary if we use auth for mongo
// we are not currently using auth but I've left this if we do

db.createUser(
    {
        user: "omdb",
        pwd: "abcdefg",
        roles: [
            {
                role: "readWrite",
                db: "omdb"
            }
        ]
    }
)