
SELECT [Organizations].[Id]
      ,[Organizations].[Name] as organization_name
	  ,dep.Name as parent_organization
	  ,concat 
	  (	
		  case when Districts.Name is null then Districts.Name else Districts.Name+', ' end,
		  case when Streets.Name is null then Streets.Name else Streets.Name+' ' end,
		  case when Houses.Number is null then Houses.Number else Houses.Number end,
		  case when Houses.Letter is null then Houses.Letter else ' '+ Houses.Letter end
	  ) as adress
	 -- ,Contact_phones.Number
	 ,case when Contact_phones.Number is null then NULL 
	    else concat ( '0', cast(Contact_phones.Number as nvarchar)) end as Number
  FROM [dbo].[Organizations]
  left join Organizations as dep on dep.id = Organizations.Parent_Organization_ID
  	left join Houses on Houses.Id = Organizations.Houses_ID
	left join Streets on Streets.Street_id = Houses.Street_id
	left join Districts on Districts.Id = Houses.District_id
	--left join Contacts on Contacts.Organisation_ID = Organizations.id
	left join Contacts on Contacts.Id = Organizations.Contacts_ID
	left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
where Organizations.Is_WC = 1  and [Organizations].[Id] <> 28 --and Organizations.Id @OrgID
and
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
