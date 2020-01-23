SELECT ROW_NUMBER() OVER (ORDER BY building_id, [entrance], [entercode], [storeysnumber], [floor], [flat], [exit], [moreinformation], [longitude], [latitude]) Id,
  [entrance], [entercode], [storeysnumber], [floor], [flat], [exit], [moreinformation], [longitude], [latitude],
  ISNULL(s.name, N'')+ISNULL(b.name, N'') AdressSearch
  FROM
  (
  SELECT [entrance], [entercode], [storeysnumber], [floor], [flat], [exit], [moreinformation], [longitude], [latitude], building_id
  FROM [dbo].[Persons]
  UNION
  SELECT [entrance], [entercode], [storeysnumber], [floor], [flat/office], [exit], [moreinformation], [longitude], [latitude], building_id
  FROM [dbo].[Events]) t
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Buildings] b ON T.building_id=b.Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].Streets s ON b.street_id=s.Id
  WHERE #filter_columns#
  ORDER BY 1--#sort_columns#
  OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only