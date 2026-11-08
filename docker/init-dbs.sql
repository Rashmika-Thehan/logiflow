-- Initialize all microservice databases on first boot
SELECT 'CREATE DATABASE logiflow_shipment' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'logiflow_shipment')\gexec
SELECT 'CREATE DATABASE logiflow_dispatch' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'logiflow_dispatch')\gexec
SELECT 'CREATE DATABASE logiflow_driver' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'logiflow_driver')\gexec
SELECT 'CREATE DATABASE logiflow_notification' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'logiflow_notification')\gexec

