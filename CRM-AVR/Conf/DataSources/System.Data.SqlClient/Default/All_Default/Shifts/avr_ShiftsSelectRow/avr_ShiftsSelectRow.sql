SELECT [Shifts].[Id]
      ,[Organizations].[Id] as organizations_id2
	  ,[Shifts].[Name] as shifts_name
	--,[Teams].[Name] as teams_name
	,concat (Organizations.Name,' - ',[Teams].[Name]) as teams_name
		,Teams.Id as teams_id
      ,[Shifts].[Shift_date]
      ,[Shifts].[Plan_start_time]
      ,[Shifts].[Plan_end_time]
      ,[Shifts].[Fact_start_time]
      ,[Shifts].[Fact_end_time]
      ,[Mechanisms].[Name] as mechanisms_name
        ,[Mechanisms].[Id] as mechanisms_id
  FROM [dbo].[Shifts]
	left join Teams on Teams.Id = Shifts.Team_ID
	left join Organizations on Organizations.Id = Teams.Organization_ID
	left join Mechanisms on Mechanisms.Id = Shifts.Mechanism_ID
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
WHERE [Shifts].[Id]= @Id