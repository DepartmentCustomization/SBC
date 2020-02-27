declare @output_cont table ([Id] int);
declare @contact_id int;
    
UPDATE [dbo].[Organizations]
     set  [Name]= @organizations_name
		  ,Houses_ID = @adress_id
		  ,Parent_Organization_ID = @parent_organization_id
		  ,Is_selected = @Is_selected
		  ,Short_name = @Short_name
		where Id=@Id

if (select Contacts_ID from [dbo].[Organizations] where id = @Id) is not null
begin
    UPDATE [dbo].[Contacts] 
    	set	    [Name]=@organizations_name
    	where Contacts.Id = (select top 1 Contacts_ID from [dbo].[Organizations] where id = @Id)
    UPDATE [dbo].[Contact_phones]
         set    [Number]= @Number
               ,[Name]= @phone_comment
    		where Contact_ID = (select top 1 Contacts_ID from [dbo].[Organizations] where id = @Id)
end
--ELSE
if @Number is not null
begin
        INSERT INTO [dbo].[Contacts]
               ( [Contact_type_ID]
               ,[Name])
         output [inserted].[Id] into @output_cont([Id])
         VALUES(2 
               ,@organizations_name);
    

    set @contact_id = (select top 1 [Id] from @output_cont);
    
        if (@contact_id) is not null
        begin
                INSERT INTO [dbo].[Contact_phones]
                           ([Contact_ID]
                           ,[Number]
                           ,[Name])
                     VALUES
                           (@contact_id
                           ,@Number
                           ,@phone_comment )
                
                UPDATE [dbo].[Organizations]
                    SET Contacts_ID = @contact_id
                where Organizations.Id= @id
        end
end