export enum Level {
    DEFAULT = 'default',
    PICKY = 'picky',
    ACADEMIC = 'academic',
    CLARITY = 'clarity',
    PROFESSIONAL = 'professional',
    CREATIVE = 'creative',
    CUSTOMER = 'customer',
    JOBAPP = 'jobapp',
    OBJECTIVE = 'objective',
    ELEGANT = 'elegant'
}
export type Config = {
    basePath: string;
    language: string;
    level: Level;
}

export const CONFIG:Config = {
    basePath: 'http://localhost:8010',
    language: 'en-GB',
    level: Level.PROFESSIONAL
}
