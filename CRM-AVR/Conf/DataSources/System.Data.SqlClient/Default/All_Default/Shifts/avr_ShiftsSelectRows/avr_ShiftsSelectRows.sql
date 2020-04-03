SELECT 
	   [Shifts].[Id]
	  ,[Shifts].[Shift_date]
	  ,Organizations.Name as organizations_name
	  ,Shifts.Name as shifts_name
      ,[Teams].[Name] as teams_name
      ,Shifts.Plan_start_time
      ,Shifts.Plan_end_time
    --  ,convert(nvarchar(5),Shifts.Plan_start_time) as Plan_start_time
	--  ,convert(nvarchar(5),Shifts.Plan_end_time) as Plan_end_time
	 --,Contacts.Name as contacts_name_brigabir
	  ,case when Shift_Jobs.Is_main = 1 then Contacts.Name
		else '---' end as contacts_name_brigabir
    ,cast (tabl_phone.phone_number as nvarchar) as phone_brigabir
	  ,Mechanisms.Name as mechanisms_name
	  --,con.Name as contacts_name_driver
	  ,case when sh_j.Is_driver = 1 then con.Name
		else '---' end as contacts_name_voditel
	   ,cast (tabl2_phone.ph_num as nvarchar) as phone_driver
  FROM [dbo].[Shifts]
	left join Teams on Teams.Id = Shifts.Team_ID
	left join Mechanisms on Mechanisms.Id = Shifts.Mechanism_ID
	left join Organizations on Organizations.Id = Teams.Organization_ID
	
	left join Shift_Jobs on Shift_Jobs.Shift_ID = Shifts.Id and Shift_Jobs.Is_main = 1
	left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
    left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join (SELECT Contact_ID
					,(select rtrim(a.Number) +N';' as 'data()' from dbo.Contact_phones as a where b.Contact_ID = a.Contact_ID for xml path('')) as phone_number
			FROM dbo.Contact_phones b GROUP BY Contact_ID) as tabl_phone on tabl_phone.Contact_ID = Contacts.Id
	
	left join Shift_Jobs as sh_j on sh_j.Shift_ID = Shifts.Id and sh_j.Is_driver = 1
	left join Jobs as jbs on jbs.Id = sh_j.Job_ID
		left join Contacts as con on con.Id = jbs.Contacts_ID
    left join --Contact_phones as c_ph on c_ph.Contact_ID = con.Id
		(SELECT phon.Contact_ID
			,(select rtrim(c.Number) + N';' as 'data()' from dbo.Contact_phones as c where c.Contact_ID =phon.Contact_ID for xml path('')) as ph_num
			FROM dbo.Contact_phones as phon GROUP BY phon.Contact_ID) as tabl2_phone on tabl2_phone.Contact_ID = con.Id
		
WHERE [Shifts].[Shift_date] >= convert(nvarchar(13),getutcdate(), 101) and Organizations.Id @OrgID
and #filter_columns#
--Shifts.Id = 25
order by 2

  
offset @pageOffsetRows rows fetch next @pageLimitRows rows only

/*SELECT distinct [Shifts].[Shift_date]
--convert(nvarchar(11), [Shifts].[Shift_date], 113) as Shift_date
	  ,Organizations.Name as organizations_name
	  ,Shifts.Name as shifts_name
      ,[Teams].[Name] as teams_name
      ,convert(nvarchar(5),Shifts.Plan_start_time) as Plan_start_time
	  ,convert(nvarchar(5),Shifts.Plan_end_time) as Plan_end_time
	  ,Contacts.Name as contacts_name_brigabir
	  ,cast (tabl_phone.phone_number as nvarchar) as phone_brigabir
	  ,Mechanisms.Name as mechanisms_name
	  ,con.Name as contacts_name_driver
	  ,cast (tabl2_phone.ph_num as nvarchar) as phone_driver
	  ,[Shifts].[Id]
  FROM [dbo].[Shifts]
	left join Teams on Teams.Id = Shifts.Team_ID
	left join Organizations on Organizations.Id = Teams.Organization_ID
	left join Shift_Jobs on Shift_Jobs.Shift_ID = Shifts.Id
	left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join (SELECT Contact_ID
					,(select rtrim(a.Number) +N';' as 'data()' from dbo.Contact_phones as a where b.Contact_ID = a.Contact_ID for xml path('')) as phone_number
			FROM dbo.Contact_phones b GROUP BY Contact_ID) as tabl_phone on tabl_phone.Contact_ID = Contacts.Id
	left join Mechanisms on Mechanisms.Id = Shifts.Mechanism_ID

	left join Shift_Jobs as sh_j on sh_j.Shift_ID = Shifts.Id
	left join Jobs as jbs on jbs.Id = sh_j.Job_ID
	left join Contacts as con on con.Id = jbs.Contacts_ID
	left join --Contact_phones as c_ph on c_ph.Contact_ID = con.Id
		(SELECT phon.Contact_ID
			,(select rtrim(c.Number) + N';' as 'data()' from dbo.Contact_phones as c where c.Contact_ID =phon.Contact_ID for xml path('')) as ph_num
			FROM dbo.Contact_phones as phon GROUP BY phon.Contact_ID) as tabl2_phone on tabl2_phone.Contact_ID = con.Id
		
WHERE --Shift_Jobs.Is_main = 1 and sh_j.Is_driver = 1
--and*/
	 