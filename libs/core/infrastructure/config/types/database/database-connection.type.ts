export type DatabaseConnection = {
    host: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
};

export type AnalyticsDatabaseConnection = DatabaseConnection & {
    schema: string;
};
