select 
	Contacts.Id,
	IIF(Jobs.Job_name is not null,
	    concat(Contacts.Name,'( ' + Job_name + ' )'),
        Contacts.Name
		 ) as pib
from Contacts
left join Jobs on Jobs.Contacts_ID = Contacts.Id
where Contacts.Organisation_ID = @org_id
and #filter_columns#
	 #sort_Columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only