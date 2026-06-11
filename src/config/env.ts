import dotenv from "dotenv";


// .env
dotenv.config();


export const configENV : {
    port: string | number;
    corsOrigin: string;
    db: string;
    api_file_size: string;
    secret_key: string;
    accessTokenSecret: string;
    accessTokenTimeout: string | number;
    refreshTokenSecret: string;
    refreshTokenTimeout: string | number;
} = {
    port: process.env.PORT || 3000,
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
    
    // database connection string
    db: process.env.DATABASE_URL || "",

    // api access file size
    api_file_size: "26kb",
    secret_key: process.env.SECRET_KEY || "SECRET_KEY",
    
    // jwt settings
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "default_access_secret",
    accessTokenTimeout: process.env.ACCESS_TOKEN_EXPIRE_MINUTES || 15,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
    refreshTokenTimeout: process.env.REFRESH_TOKEN_EXPIRE_DAYS || 7,
};