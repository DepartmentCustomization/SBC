SELECT [Shift_Jobs].[Id]
      ,[Shift_Jobs].[Job_ID] as jobs_id
      ,[Shift_Jobs].[Shift_ID]
	  ,Contacts.Name
  FROM [dbo].[Shift_Jobs]
  left join Shifts on Shifts.Id = Shift_Jobs.Shift_ID
  left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
  left join Contacts on Contacts.Id = Jobs.Contacts_ID
  where Shift_ID = @Id
and 
    #filter_columns#
    #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only