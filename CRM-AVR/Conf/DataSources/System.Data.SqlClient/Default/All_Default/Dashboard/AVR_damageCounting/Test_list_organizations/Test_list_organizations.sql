select tb1.Id,tb1.Name,tb1.ord
from (
SELECT [Id]
      ,[Name]
      ,case when Id = 19 then % else 2 end as [ord]
  FROM [dbo].[Organizations]
  where [Is_WC] = 1
  ) as tb1
  
  --and Parent_Organization_ID is null
  where tb1.[Id] @Ord_ID
  and
     #filter_columns#
    -- #sort_columns#
   order by tb1.ord
offset @pageOffsetRows rows fetch next @pageLimitRows rows only