SELECT 
h.Id,
isnull(s.name_shortToponym,N'') + N' ' + isnull(s.name_fullName,N'') + N', ' + isnull(h.name_ofFirstLevel_fullName,N'') as [Name]
FROM dbo.houses h
INNER JOIN dbo.streets s on s.Id = h.ofStreet_id
WHERE #filter_columns#
     #sort_columns#
 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only