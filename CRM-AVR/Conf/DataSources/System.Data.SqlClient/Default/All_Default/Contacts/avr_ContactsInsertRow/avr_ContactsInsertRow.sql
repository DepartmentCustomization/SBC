declare @output table ([Id] int);
   
INSERT INTO [dbo].[Contacts]
           ([Contact_type_ID]
           ,[Name]
           ,[First_name]
           ,[Middle_name]
           ,[Surname]
           ,[Houses_ID]
           ,[Flats_ID]
           ,[Organisation_ID]
           --,[Job_ID]
           )
output [inserted].[Id] into @output([Id])
     VALUES
           (@contact_types_id
           --,concat (@Surname,' ',@First_name,' ',@Middle_name)
           ,concat 
        	  (   case when @Surname is null then @Surname else @Surname + ' 'end,
        		  case when @First_name is null then @First_name else @First_name end,
        		  case when @Middle_name is null then @Middle_name else ' '+ @Middle_name end )
           ,@First_name
           ,@Middle_name
           ,@Surname
           ,@houses_id
           ,@flats_id
           ,@organizations_id
           --,@job_id
		   )
declare @cont_id int;
set @cont_id = (select top 1 [Id] from @output);

INSERT INTO [dbo].Contact_phones
	(
		Number
		,Name
		,Contact_ID
	)
	VALUES
	(
		 @number_name
		,@comment_phone
		,@cont_id
	)

select @cont_id as Id;
return