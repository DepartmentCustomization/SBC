declare @output table ([Id] int);

if (@is_External_service = 1)
begin
	set @Contact_type_ID = 5 --Зовнішня служба
end
else
begin
	set @Contact_type_ID = 2 --Абонент юридична особа
end


INSERT INTO [dbo].[Organizations]
           (
		    [Name]
		   ,[Parent_Organization_ID]
		   ,Houses_ID
		   ,Is_WC
		   ,is_External_service
	       ,is_Contract_organization
	       ,is_Special_service
		  -- ,Contacts_ID
		   )
output [inserted].[Id] into @output([Id])
     VALUES
           (
		    @organizations_name
		   ,@parent_organization_id
		   ,@adress_id
		   ,-1 -- юридична особа
		   ,@is_External_service
	       ,@is_Contract_organization
	       ,@is_Special_service
		   --,@Contacts_ID
		   );

declare @org_id int;
set @org_id = (select top 1 [Id] from @output);


declare @output_cont table ([Id] int);

INSERT INTO [dbo].[Contacts]
           (
		    [Contact_type_ID]
           ,[Name]
           --,[Organisation_ID]
		   )
output [inserted].[Id] into @output_cont([Id])
     VALUES
           (
		    @Contact_type_ID
           ,@organizations_name -- Name
           --,@org_id
		   );

declare @contact_id int;
set @contact_id = (select top 1 [Id] from @output_cont);

INSERT INTO [dbo].[Contact_phones]
           (
		    [Contact_ID]
           ,[Number]
           ,[Name]
		   )
     VALUES
           (
		    @contact_id
           ,@Number
           ,@phone_comment -- коментарий к телефону
		   )

UPDATE [dbo].[Organizations]
SET Contacts_ID = @contact_id
where Organizations.Id= @org_id

select @org_id as Id;
return;
