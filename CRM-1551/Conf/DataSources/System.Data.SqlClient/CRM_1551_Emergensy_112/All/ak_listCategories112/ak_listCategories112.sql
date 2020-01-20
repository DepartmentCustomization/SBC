  /*DECLARE @fire BIT='false';
  DECLARE @police BIT='true';
  DECLARE @medical BIT='false';
  DECLARE @gas BIT='true';
*/
  SELECT id, t.Name
  FROM (
  SELECT DISTINCT c.Id, c.Name
  FROM [dbo].[CategoryInServices] cis
  INNER JOIN [dbo].Categories c ON cis.category_id=c.id
  WHERE cis.service_id IN
  (SELECT CASE WHEN @fire='true' THEN 1 ELSE 0 END id
  UNION
  SELECT CASE WHEN @police='true' THEN 2 ELSE 0 END id
  UNION
  SELECT CASE WHEN @medical='true' THEN 3 ELSE 0 END id
  UNION
  SELECT CASE WHEN @gas='true' THEN 4 ELSE 0 END Id)) t
  WHERE  #filter_columns#
  --#sort_columns#
  ORDER BY 1
 offset @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only