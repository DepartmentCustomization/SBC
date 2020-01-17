  --DECLARE @category_Id INT = 1;

  SELECT Id, [service_name] [Name]
  FROM (
  SELECT DISTINCT s.Id, s.[Service_name]
  FROM [dbo].[CategoryInServices] cis
  INNER JOIN [dbo].[Services] s ON cis.service_id=s.id
  WHERE category_id=@Category_Id) t
  WHERE #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only