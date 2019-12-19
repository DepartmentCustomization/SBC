SELECT 
ect.Id,
ct.Id as claim_type_id,
ct.[Name] AS claim_type,
e.Id AS employee_id,
e.PIB AS employee

FROM dbo.employees_claim_types ect 
INNER JOIN dbo.claim_types ct on ct.Id = ect.claim_type_id
INNER JOIN dbo.employees e on e.Id = ect.employee_id
WHERE ect.Id = @Id