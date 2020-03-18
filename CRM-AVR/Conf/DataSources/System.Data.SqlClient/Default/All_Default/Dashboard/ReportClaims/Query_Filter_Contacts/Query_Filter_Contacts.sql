
select [Id], [Name]  
from (
    select distinct t1.Contact_ID as [Id], t2.[Name]
    from Claims as t1
    left join Contacts as t2 on t2.Id = t1.Contact_ID
    where t1.Contact_ID is not null
    ) as t1
where #filter_columns#
 --    #sort_columns#
 order by 2
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only