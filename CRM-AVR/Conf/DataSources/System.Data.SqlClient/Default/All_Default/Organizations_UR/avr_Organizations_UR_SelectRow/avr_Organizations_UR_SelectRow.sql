SELECT [Organizations].[Id]
      ,[Organizations].[Name] as organizations_name
	  ,concat 
	  (
		  case when Districts.Name is null then Districts.Name else Districts.Name+', ' end,
		  case when Streets.Name is null then Streets.Name else Streets.Name+', ' end,
		  case when Houses.Number is null then Houses.Number else Houses.Number end,
		  case when Houses.Letter is null then Houses.Letter else ', '+ Houses.Letter end
	  ) as adress_name
	  ,Houses.Id as adress_id
	  ,case when Contact_phones.Number is null then NULL 
	    else concat ( '0', cast(Contact_phones.Number as nvarchar)) end as Number
	  ,Contact_phones.Name as phone_comment
	  ,Organizations.Contacts_ID
	  ,Contacts.Contact_type_ID
	  ,is_External_service
	  ,is_Contract_organization
	  ,is_Special_service
  FROM [dbo].[Organizations]
  	left join Houses on Houses.Id = Organizations.Houses_ID
	left join Streets on Streets.Street_id = Houses.Street_id
	left join Districts on Districts.Id = Houses.District_id
	left join Contacts on Contacts.Id = Organizations.Contacts_ID
	left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
	left join Contact_types on Contact_types.Id = Contacts.Contact_type_ID
WHERE [Organizations].Id= @Id