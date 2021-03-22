
SELECT Jobs.Id,
  CONCAT(Contacts.[Name], ' ( ' + Jobs.Job_name + ')') AS Name
FROM
  [dbo].[Jobs] [Jobs] 
  LEFT JOIN [dbo].[Contacts] [Contacts] ON [Contacts].Id = Jobs.[Contacts_ID]

   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only