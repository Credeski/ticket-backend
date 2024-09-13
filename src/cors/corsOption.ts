import { allowedOrigins } from "./allowedOrigins";

interface CorsOptions {
    origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
    ) => void;
    optionsSuccessStatus: number;
}

export function getCorsOptions(): CorsOptions {
    return {
        origin: (
            origin: string | undefined,
            callback: (err: Error | null, allow?: boolean) => void
        ) => {
            if (allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        optionsSuccessStatus: 200
    };
}
