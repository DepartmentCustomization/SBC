SELECT Organizations.[Id]
      ,[Organizations].[Name]
      ,[Parent_Organization_ID]
      ,Organizations.[Short_name]
      ,Contacts.Id as cont_id
FROM [dbo].Organizations
inner join [Contacts] on Organizations.Contacts_ID = Contacts.Id
   where Is_WC <> 1
  and #filter_columns#
	 #sort_Columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only