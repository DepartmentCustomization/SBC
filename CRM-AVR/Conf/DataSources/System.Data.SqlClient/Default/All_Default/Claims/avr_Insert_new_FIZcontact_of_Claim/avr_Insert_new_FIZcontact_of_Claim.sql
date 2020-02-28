declare @tabl table (Id int)

if @FIZ_contact_fio is not null 
begin
    INSERT INTO [dbo].[Contacts]
               ([Contact_type_ID]
               ,[Name])
    	output inserted.Id into @tabl(Id)
         VALUES
               (1
               ,@FIZ_contact_fio)
    
    	declare @contact_id int
    	set @contact_id = (select top(1) Id from @tabl)
    
    	insert into Contact_phones
    	(Contact_ID
    	,[Number]
    	)
    	values
    	(@contact_id
    	,@FIZ_number
    	)
end

select Contacts.Name, Number, Contacts.Id from Contacts
    left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
where Contacts.Id = @contact_id
return