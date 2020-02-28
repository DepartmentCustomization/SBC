SELECT [Contacts].[Id]
      ,Organizations.Name as organizations_name
	  ,Streets.Name as streets_name
	  ,Houses.Name as houses_name
  FROM [dbo].[Contacts]
	left join Organizations on Organizations.Contacts_ID = Contacts.Id
	left join Houses on Houses.Id = Organizations.Houses_ID
	left join Streets on Streets.Id = Houses.Street_id
where Organizations.Is_WC = 0
 and
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only