-- DECLARE @notCross BIT = 0;

IF(@notCross = 0) OR (@notCross IS NULL)
BEGIN
SELECT [Id]
      ,[Name]
  FROM [dbo].[Place_types]
  WHERE 
  (Id BETWEEN 11 AND 20)
  AND #filter_columns#
  ORDER BY 1
 OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;
 END

ELSE IF (@notCross = 1)
BEGIN
SELECT [Id]
      ,[Name]
  FROM [dbo].[Place_types]
  WHERE 
  (Id BETWEEN 11 AND 20
  AND Id <> 19)
  AND #filter_columns#
  ORDER BY 1
 OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;
END