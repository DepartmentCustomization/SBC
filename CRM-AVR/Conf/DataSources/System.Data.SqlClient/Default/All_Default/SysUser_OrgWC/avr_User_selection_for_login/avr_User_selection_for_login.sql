select 
	Jobs.Id
	,concat( Contacts.name, ' (',Positions.Name, ')') as name
from Jobs
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join Positions on Positions.Id = Jobs.Position_ID
	where Jobs.Organization_ID =  @org_id
	  and 
  #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
	