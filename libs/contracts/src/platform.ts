// Freelance ("platform") drivers belong to this reserved tenant. That keeps the invariant every guard,
// column, token and Kafka event relies on: everything has a tenant.
export const PLATFORM_TENANT_ID = 'platform';
export const PLATFORM_ORG_NAME = 'the LogiFlow driver network';
export const isPlatformTenant = (tenantId?: string | null) => tenantId === PLATFORM_TENANT_ID;