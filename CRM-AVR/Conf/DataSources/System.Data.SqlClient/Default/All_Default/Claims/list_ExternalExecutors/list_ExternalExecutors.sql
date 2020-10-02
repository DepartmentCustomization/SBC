SELECT
DISTINCT
    o.[Id],
    o.[Name]
FROM
    [dbo].[Organizations] o
WHERE
    o.is_External_service = 1
   AND #filter_columns#
       #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;