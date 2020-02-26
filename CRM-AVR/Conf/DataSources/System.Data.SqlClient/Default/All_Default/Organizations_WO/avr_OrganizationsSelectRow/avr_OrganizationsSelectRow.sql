SELECT [Organizations].[Id]
      , [Organizations].[Id] as organization_id2
      ,[Organizations].[Name] as organizations_name
	  ,dep.Name as parent_organization
	    ,dep.Id as parent_organization_id
	  ,concat 
	  (
		  case when Districts.Name is null then Districts.Name else Districts.Name+', ' end,
		  case when Streets.Name is null then Streets.Name else Streets.Name+', ' end,
		  case when Houses.Number is null then Houses.Number else Houses.Number end,
		  case when Houses.Letter is null then Houses.Letter else ', '+ Houses.Letter end
	  ) as adress_name
	  ,Houses.Id as adress_id
	  --,Contact_phones.Number
	  ,case when Contact_phones.Number is null then NULL 
	    else concat ( '0', cast(Contact_phones.Number as nvarchar)) end as Number
	  ,Contact_phones.Name as phone_comment
	  ,Organizations.Is_WC
	  ,Organizations.Is_selected
	  ,Organizations.Short_name
  FROM [dbo].[Organizations]
    left join Organizations as dep on dep.id = Organizations.Parent_Organization_ID
  	left join Houses on Houses.Id = Organizations.Houses_ID
	left join Streets on Streets.Street_id = Houses.Street_id
	left join Districts on Districts.Id = Houses.District_id
	--left join Contacts on Contacts.Organisation_ID = Organizations.id
	left join Contacts on Contacts.Id = Organizations.Contacts_ID
	left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
WHERE [Organizations].Id= @Id