INSERT INTO "Tenant" ("id", "name", "createdAt")
VALUES ('platform', 'LogiFlow Platform', CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
