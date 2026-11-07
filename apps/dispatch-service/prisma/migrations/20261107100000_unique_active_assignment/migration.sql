-- Create unique partial index to ensure at most one active assignment per shipment
CREATE UNIQUE INDEX "Assignment_unique_active_shipment_idx" 
ON "Assignment" ("shipmentId") 
WHERE status IN ('PENDING_ACCEPTANCE', 'ACCEPTED');