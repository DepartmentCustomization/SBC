declare @cont table ([Id] int);
declare @org table ([Id] int);
declare @cont_org table ([Id] int);
declare @cont_id int;
declare @org_id int;
declare @cont_org_id int;


 --Абонент фізична особа
if @m_Contact_type_ID = 1
BEGIN
	insert into [dbo].[Contacts] ( [Contact_type_ID],[Name],[First_name],[Middle_name],[Surname] )
		output [inserted].[Id] into @cont([Id])
		values
		   (@m_Contact_type_ID
		   ,concat 
        	  (   case when @m_Surname is null then @m_Surname else @m_Surname + ' 'end,
        		  case when @m_First_name is null then @m_First_name else @m_First_name end,
        		  case when @m_Middle_name is null then @m_Middle_name else ' '+ @m_Middle_name end )
		   ,@m_First_name
		   ,@m_Middle_name
		   ,@m_Surname  )

	set @cont_id = (select top 1 [Id] from @cont)

	insert into [dbo].Contact_phones (Number, Contact_ID)
		values	( @m_phone_number, @cont_id)
	goto Ret
END

-- Абонент юридична особа, Зовнішня служба і заповнено ім'я фіз. особи
if  @m_Contact_type_ID = 2 and  @m_First_name != '' or @m_Surname != ''
BEGIN
			
	insert into [dbo].[Organizations] ([Name],[Parent_Organization_ID],[Houses_ID],[Is_WC],[Is_activ],[Is_selected])
		output [inserted].[Id] into @org([Id])
		values (@org_name, null, null, -1, 1, 0)

	set @org_id  = (select top 1 [Id] from @org)

	insert into [dbo].[Contacts] ( [Contact_type_ID],[Name] )
		output [inserted].[Id] into @cont_org([Id])
		values (@m_Contact_type_ID, @org_name)

	set @cont_org_id  = (select top 1 [Id] from @cont_org)

	update [Organizations]
		set Contacts_ID = @cont_org_id where Id = @org_id
		
		 
	insert into [dbo].[Contacts] ( [Contact_type_ID],[Name],[First_name],[Middle_name],[Surname], Organisation_ID )
		output [inserted].[Id] into @cont([Id])
		values
		   (1
		   ,concat 
        	  (   case when @m_Surname is null then @m_Surname else @m_Surname + ' 'end,
        		  case when @m_First_name is null then @m_First_name else @m_First_name end,
        		  case when @m_Middle_name is null then @m_Middle_name else ' '+ @m_Middle_name end )
		   ,@m_First_name
		   ,@m_Middle_name
		   ,@m_Surname
		   ,@org_id	   )	
		   
		 set @cont_id = (select top 1 [Id] from @cont)
		  
		insert into [dbo].Contact_phones (Number, Contact_ID)
			values ( @m_phone_number, @cont_id)
	goto Ret
END

-- Абонент юридична особа, Зовнішня служба і НЕзаповнено ім'я фіз. особи
if ( @m_Contact_type_ID = 2  and  @m_First_name = '' or @m_Surname = '' )
BEGIN
	insert into [dbo].[Organizations] ([Name],[Parent_Organization_ID],[Houses_ID],[Is_WC],[Is_activ],[Is_selected])
		output [inserted].[Id] into @org([Id])
		values (@org_name, null, null, -1, 1, 0)

	set @org_id  = (select top 1 [Id] from @org)

	insert into [dbo].[Contacts] ( [Contact_type_ID],[Name] )
		output [inserted].[Id] into @cont_org([Id])
		values (@m_Contact_type_ID, @org_name)

	set @cont_id  = (select top 1 [Id] from @cont_org)

	update [Organizations]
		set Contacts_ID = @cont_id 
		where Id = @org_id

	insert into [dbo].Contact_phones (Number, Contact_ID)
		values ( @m_phone_number, @cont_id)
	goto Ret
END

Ret:
-- 	select @cont_id as Id, 
-- 				concat 
--         		  (   case when @m_Surname is null then @m_Surname else @m_Surname + ' 'end,
--         			  case when @m_First_name is null then @m_First_name else @m_First_name end,
--         			  case when @m_Middle_name is null then @m_Middle_name else ' '+ @m_Middle_name end ) as Name,
--         		@m_phone_number as phone,
--         	    @org_name as org_name
select Contacts.Id
			, Contacts.Name
			,Contact_phones.Number as phone
		from Contacts
		left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id 
		where Contacts.Id = @cont_id
        			  
return;