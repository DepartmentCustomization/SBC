select tb1.Id,tb1.Name, tb1.Short_name, tb1.ord
from (
        SELECT [Id]
              ,[Name]
              ,Short_name
              ,case when Id = 1 then 1 else 2 end as [ord]
          FROM [dbo].[Organizations]
          where [Is_WC] = 1 and is_selected = 1
    ) as tb1
  where  tb1.[Id] @GlodalFilter_UserOrganizations
  and
    #filter_columns#
   order by tb1.ord
offset @pageOffsetRows rows fetch next @pageLimitRows rows only