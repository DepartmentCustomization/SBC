SELECT [Maintenance].[Id]
      ,[Maintenance].[Start_at]
      ,[Maintenance].[Finished_at]
      ,[Maintenance].[Name]
      --,[Maintenance].[Contacts_ID]
      ,Contacts.Name as contacts_name
  FROM [dbo].[Maintenance]
  left join contacts on contacts.Id = [Maintenance].[Contacts_ID]
  where [Maintenance].MechanismsID = @Id
  and  #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only