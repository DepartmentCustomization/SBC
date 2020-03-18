
SELECT [Shifts].[Id]
      ,convert(nvarchar(13),Shift_date, 103) as Shift_date
      ,[Shifts].[Name] as shifts_name
        ,Shifts.Id as shifts_id
	  ,Teams.Name as teams_name
	   -- ,Teams.Id as teams_id
	  ,Contacts.Name as contacts_name
	  ,Shift_Jobs.Is_main
	  ,Shift_Jobs.Is_driver
	  ,case when len(concat( [Mechanisms].[Name],N'; Гос.номер: ' + [Mechanisms].[Number])) = 0 then NULL else
		concat([Mechanisms].[Name],N'; Гос.номер: ' + [Mechanisms].[Number]) end as mechanisms_name
  FROM [dbo].[Shifts]
	left join Teams on Teams.Id = Shifts.Team_ID
	left join Organizations on Organizations.Id = Teams.Organization_ID
	left join Shift_Jobs on Shift_Jobs.Shift_ID = Shifts.Id
	left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join Mechanisms on Mechanisms.Id = Shifts.Mechanism_ID
WHERE Teams.Organization_ID =@Id 
--and Contacts.Name is not null
and [Shifts].[Shift_date] >= convert(nvarchar(13),getutcdate(), 101)
and 
     #filter_columns#
     --#sort_columns#
     order by 2 
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only