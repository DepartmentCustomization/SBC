select cp.Id, cp.[Number] as phone
from Contact_phones cp
join Contacts c on c.Id = cp.Contact_ID
join Organizations o on o.Contacts_ID = c.Id
where o.Id = @executor_id
and #filter_columns#
	 #sort_Columns#
--offset @pageOffsetRows rows fetch next @pageLimitRows rows only