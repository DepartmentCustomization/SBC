SELECT 
   e.Id,
   e.PIB,
   e.position,
   org.Id as organization_id,
   org.[Name] as orgName,
   e.phone_1,
   e.phone_2,
   e.UserId

   FROM dbo.organizations  org
   INNER JOIN dbo.employees e on e.organization_id = org.Id 
   WHERE  #filter_columns#
          #sort_columns#
 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY
