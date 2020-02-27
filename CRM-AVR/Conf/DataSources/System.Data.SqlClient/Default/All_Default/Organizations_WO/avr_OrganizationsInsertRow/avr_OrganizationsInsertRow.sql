declare @output table ([Id] int);


INSERT INTO [dbo].[Organizations]
           (
		    [Name]
		   ,[Parent_Organization_ID]
		   ,Houses_ID
		  -- ,Contacts_ID
		  ,Is_WC
		  ,Is_selected
		  ,Short_name
		   )
output [inserted].[Id] into @output([Id])
     VALUES
           (
		    @organizations_name
		   ,@parent_organization_id
		   ,@adress_id
		   --,@Contacts_ID
		   ,1 --@Is_WC
		   ,@Is_selected
		   ,@Short_name
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
		    2 -- Contact_type_ID юр.особа
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
