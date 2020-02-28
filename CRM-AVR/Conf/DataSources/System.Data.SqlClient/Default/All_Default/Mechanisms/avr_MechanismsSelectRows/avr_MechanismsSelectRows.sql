SELECT [Mechanisms].[Id]
	  ,Mechanism_types.Name as mechanism_types_name
      ,[Mechanisms].[Name] as mechanisms_name
      ,[Mechanisms].[Number] as mechanisms_number
      ,Organizations.Name as organizations_name
	  --,Contacts.Name as contact_name
	  ,[Mechanisms].[nssm]
  FROM [dbo].[Mechanisms]
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
	left join Organizations on Organizations.Id = Mechanisms.Organizations_ID
--	left join Shifts on Shifts.Mechanism_ID = Mechanisms.Id
--	left join Shift_Jobs on Shift_Jobs.Shift_ID = Shifts.Id  and  Shift_Jobs.Is_driver =1
	--left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
	--left join Contacts on Contacts.Job_ID = Jobs.Id
WHERE Mechanisms.Organizations_ID @OrgID
and
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only