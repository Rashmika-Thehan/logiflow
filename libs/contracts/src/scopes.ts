export const SCOPES = {
    SHIPMENTS_WRITE: 'shipments:write',
    SHIPMENTS_READ: 'shipments:read',
} as const;

export type Scope = (typeof SCOPES)[keyof typeof SCOPES];
export const ALL_SCOPES: Scope[] = Object.values(SCOPES);