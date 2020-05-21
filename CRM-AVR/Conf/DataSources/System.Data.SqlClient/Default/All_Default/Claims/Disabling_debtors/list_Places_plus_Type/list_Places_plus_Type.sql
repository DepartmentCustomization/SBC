SELECT
  [Places].[Id],
  Districts.Name AS distinct_name,
  concat(
    Place_types.Name,
    ': ',
    [Places].[Name],
    CASE
      WHEN Districts.Name IS NULL THEN Districts.Name
      ELSE ' (' + SUBSTRING(Districts.Name, 1, 3) + '.р-н.)'
    END
  ) AS Name
FROM
  [dbo].[Places] Places
  LEFT JOIN [dbo].[Place_types] Place_types ON Place_types.Id = Places.Place_type_ID
  LEFT JOIN [dbo].[Districts] Districts ON Districts.Id = Places.District_ID
WHERE Places.Is_Active = 1
AND 
  #filter_columns#
  #sort_columns#
  OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY ;