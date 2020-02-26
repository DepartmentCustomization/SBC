select o.Id, o.[Name]  
from Organizations o 
join Contacts c on c.Organisation_ID = o.Id 
where c.Contact_type_ID = 2 and o.is_External_service = 1
and #filter_columns#
    #sort_columns#
    offset @pageOffsetRows rows fetch next @pageLimitRows rows only