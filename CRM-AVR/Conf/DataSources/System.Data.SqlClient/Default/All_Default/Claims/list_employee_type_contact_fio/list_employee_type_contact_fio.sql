if @org_id is not null
begin
    declare @Organization table(Id int, Id_n int);
    declare @IdT table (Id int, Id_n int identity(1,1));
    
    insert into @IdT(Id)
    select Id from [dbo].Organizations 
    where (Id  = @org_id or Parent_Organization_ID = @org_id) and Id not in (select Id from @IdT)
    
    while (select count(id) from (select Id from [dbo].Organizations
    		where Parent_Organization_ID in (select Id from @IdT) and Id not in (select Id from @IdT)) q)!=0
    	begin
    		insert into @IdT
    		select Id from [dbo].Organizations
    		where Parent_Organization_ID in (select Id from @IdT) and Id not in (select Id from @IdT)
	end

select 
		Contacts.Id
		,concat(Contacts.Name, '( ' + Job_name + ' )' ) as pib
	from Jobs 
		join Contacts on Jobs.Contacts_ID = Contacts.Id
	where Jobs.Organization_ID in (select Id from @IdT)
	and #filter_columns#
	 #sort_Columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
end
else
begin
	select 
		Contacts.Id
		,concat(Contacts.Name, '( ' + Job_name + ' )' ) as pib
	from Jobs 
		inner join Contacts on Jobs.Contacts_ID = Contacts.Id
	and #filter_columns#
	 #sort_Columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
end






/*
if @org_id is not null
begin
	select 
		Contacts.Id
		,concat(Contacts.Name, '( ' + Job_name + ' )' ) as pib
	from Contacts
		left join Jobs on Jobs.Contacts_ID = Contacts.Id
	where Jobs.Organization_ID = @org_id or Contacts.Organisation_ID = @org_id
	and #filter_columns#
	 #sort_Columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
end
else
begin
	select 
		Contacts.Id
		,concat(Contacts.Name, '( ' + Job_name + ' )' ) as pib
	from Jobs 
		inner join Contacts on Jobs.Contacts_ID = Contacts.Id
	and #filter_columns#
	 #sort_Columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
end
*/