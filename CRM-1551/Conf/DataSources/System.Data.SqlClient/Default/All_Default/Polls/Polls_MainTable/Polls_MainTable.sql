select top 100 ap.Id, ap.[full_name], 
  stuff((select N', '+[phone_number] from [dbo].[ApplicantPhones] 
  where [phone_number] is not null and IsMain='true' and [applicant_id]=ap.Id for xml path('')),1,2,N'') phone_number_main, 
  stuff((select N', '+[phone_number] from [dbo].[ApplicantPhones] 
  where [phone_number] is not null and IsMain='false' and [applicant_id]=ap.Id for xml path('')),1,2,N'') phone_number_add,

  stuff((select N', '+isnull(st.shortname+N' ',N'')+isnull(s.name+N' ',N'')+isnull(N', '+b.name, N'')+isnull(N', кв.'+la.flat,N'')
  from [dbo].[LiveAddress] la
  left join [dbo].[Buildings] b on la.building_id=b.Id
  left join [dbo].[Streets] s on b.street_id=s.Id
  left join [dbo].[StreetTypes] st on s.street_type_id=st.Id
  where la.main='true' and ap.Id=la.applicant_id
  for xml path('')),1,2,N'') adress,
  --app.Name privilage,
  --case when format(ap.birth_date, 'MMdd')*1>=format(getutcdate(), 'MMdd')
		--then datediff(yy, ap.birth_date, getutcdate())
		--else datediff(yy, ap.birth_date, getutcdate())-1
		--end age,

		27 age,
  count(distinct appe.Id) count_appeals
  from [dbo].[Applicants] ap
  left join [dbo].[ApplicantPrivilege] app on ap.applicant_privilage_id=app.id
  left join [dbo].[Appeals] appe on ap.Id=appe.applicant_id
  group by 
	ap.Id, ap.[full_name], 
  app.Name