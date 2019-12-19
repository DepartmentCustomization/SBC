SELECT 
Id,
PIB,
position

FROM  dbo.employees 
WHERE organization_id = @Id
and
 #filter_columns#
 #sort_columns#
 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY