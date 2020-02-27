SELECT [Contacts].[Id]	
      ,[Contacts].[First_name]
      ,[Contacts].[Middle_name]
      ,[Contacts].[Surname]
    ,Contact_types.Name as contact_types_name
           ,Contact_types.Id as contact_types_id
	 ,case when len ( Houses.Name)= 0 then NULL else Houses.Name end as house_name
	  		,Houses.Id as houses_id
	 	  ,case when len(concat(
			   case when Flats.Number is null then  null else N' кв.' + cast(Flats.Number as nvarchar) end,
				case when Flats.Letter is null then null else N' літ. '+ cast (Flats.Letter as nvarchar) end,
				case when Flats.Floor is null then null  else N' під. '+ cast (Flats.Floor  as nvarchar) end,
				case when Flats.Porch is null then null  else N' пов. '+ cast (Flats.Porch  as nvarchar) end
			  )) = 0 then NULL else concat(
			   case when Flats.Number is null then  null else N' кв.' + cast(Flats.Number as nvarchar) end,
				case when Flats.Letter is null then null else N' літ. '+ cast (Flats.Letter as nvarchar) end,
				case when Flats.Floor is null then null  else N' під. '+ cast (Flats.Floor  as nvarchar) end,
				case when Flats.Porch is null then null  else N' пов. '+ cast (Flats.Porch  as nvarchar) end
			  ) end as flats_name
		,Flats.Id as flats_id
	,Contact_phones.Number as number_name
	,Contact_phones.Name as comment_phone
	  ,Organizations.Name as organizations_name
		,Organizations.Id as organizations_id
	 ,Jobs.Job_name as job_name
		,Jobs.Id as job_id
	, Contacts.external_Id
  FROM [dbo].[Contacts]
  left join Contact_types on Contact_types.Id = Contacts.Contact_type_ID
  left join Organizations on Organizations.Id = Contacts.Organisation_ID
  left join Jobs on Jobs.Id = Contacts.Job_ID
  left join Houses on Houses.Id = Contacts.Houses_ID
--   left join Streets on Streets.Id = Houses.Street_id
  left join Flats on Flats.Id = Contacts.Flats_ID
  left join Districts on Districts.Id = Houses.District_id
  left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
  where [Contacts].[Id]	= @Id