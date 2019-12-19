SELECT 
ect.Id,
ect.claim_type_id,
ct.[Name] AS claim_type_name,
ect.employee_id,
e.PIB as employee_name

FROM dbo.employees_claim_types ect 
INNER JOIN dbo.claim_types ct on ct.Id = ect.claim_type_id
INNER JOIN dbo.employees e on e.Id = ect.employee_id
WHERE
 #filter_columns#
 #sort_columns#
 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only