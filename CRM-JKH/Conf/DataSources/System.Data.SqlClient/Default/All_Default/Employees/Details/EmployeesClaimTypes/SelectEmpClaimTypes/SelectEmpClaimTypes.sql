SELECT 
ect.Id,
ct.[Name]

FROM dbo.employees_claim_types ect 
INNER JOIN dbo.claim_types ct on ct.Id = ect.claim_type_id
WHERE ect.employee_id = @Id
AND
 #filter_columns#
 #sort_columns#
 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only