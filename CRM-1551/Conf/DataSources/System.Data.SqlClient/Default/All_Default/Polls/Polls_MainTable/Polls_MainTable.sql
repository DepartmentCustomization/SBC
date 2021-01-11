/*
--список параметров начало
declare @district_id nvarchar(max)--=N'1,2'
,@street_id nvarchar(max)
,@building_id nvarchar(max)
,@entrance int
,@flat int
,@privilage_id nvarchar(max)
,@social_state_id nvarchar(max)
,@age_id nvarchar(max)--=N'1,2'
,@applicant_type_id int
,@question_type_id nvarchar(max)
,@executor_organization_id nvarchar(max)
,@assignment_result_id nvarchar(max)
,@assignment_resolution_id nvarchar(max)
,@receipt_source_id nvarchar(max)
,@registration_date_from date--='2020-01-01 12:01:34'
,@registration_date_to date
,@look_date_from date
,@look_date_to date
,@count_return_from int-- =2
,@count_return_to int
,@count_appeals_from int--=2 --отдельным фильтром
,@count_appeals_to int--=50 --отдельным фильтром
--список параметров конец
*/
--формирование основного параметра начало

--если ни один параметр не выбран
declare @param_no nvarchar(max)=
case when @district_id is null
 and @street_id is null
 and @building_id is null
 and @entrance is null
 and @flat is null
 and @privilage_id is null
 and @social_state_id is null
 and @age_id is null
 and @applicant_type_id is null
 and @question_type_id is null
 and @executor_organization_id is null
 and @assignment_result_id is null
 and @assignment_resolution_id is null
 and @receipt_source_id is null
 and @registration_date_from is null
 and @registration_date_to is null
 and @look_date_from is null
 and @look_date_to is null
 and @count_return_from is null
 and @count_return_to is null
 and @count_appeals_from is null
 and @count_appeals_to is null

 then N'1=2' else N'1=1' end

declare @param nvarchar(max)=
isnull(N'[Buildings].[district_id] in ('+@district_id+N')', N'1=1')+N' and ' --+
+isnull(N'[Buildings].[street_id] in ('+@street_id+N')', N'1=1')+N' and ' --+
+isnull(N'[Buildings].Id in ('+@building_id+N')', N'1=1')+N' and ' --+
+isnull(N'[LiveAddress].entrance='+ltrim(@entrance), N'1=1')+N' and ' --+
+isnull(N'[LiveAddress].flat='+ltrim(@flat), N'1=1')+N' and ' --+
+isnull(N'[Applicants].[applicant_privilage_id] in ('+@privilage_id+N')', N'1=1')+N' and ' --+
+isnull(N'[Applicants].[social_state_id] in ('+@social_state_id+N')', N'1=1')+N' and ' --+


+isnull(N'[Applicants].[applicant_type_id]='+ltrim(@applicant_type_id), N'1=1')+N' and ' --+
+isnull(N'[Questions].[question_type_id] in ('+@question_type_id+N')', N'1=1')+N' and ' --+
+isnull(N'[Assignments].[main_executor]=''true'' and [Assignments].[executor_organization_id] in ('+@executor_organization_id+N')', N'1=1')+N' and ' --+
+isnull(N'[Assignments].[main_executor]=''true'' and [Assignments].[AssignmentResultsId] in ('+@assignment_result_id+N')', N'1=1')+N' and ' --+
+isnull(N'[Assignments].[main_executor]=''true'' and [Assignments].[AssignmentResolutionsId] in ('+@assignment_resolution_id+N')', N'1=1')+N' and ' --+
+isnull(N'[Appeals].[receipt_source_id] in ('+@receipt_source_id+N')', N'1=1')+N' and ' --+
+isnull(N'convert(date, [Questions].[registration_date])>='''+ltrim(convert(date,@registration_date_from))+N'''', N'1=1')+N' and ' --+
+isnull(N'convert(date, [Questions].[registration_date])<='''+ltrim(convert(date,@registration_date_to))+N'''', N'1=1')+N' and ' --+
+isnull(N'convert(date, [AssignmentConsiderations].[consideration_date])>='''+ltrim(convert(date,@look_date_from))+N'''', N'1=1')+N' and ' --+
+isnull(N'convert(date, [AssignmentConsiderations].[consideration_date])<='''+ltrim(convert(date,@look_date_to))+N'''', N'1=1')+N' and ' --+
+isnull(N'[AssignmentRevisions].[rework_counter]>='+ltrim(@count_return_from), N'1=1')+N' and ' --+
+isnull(N'[AssignmentRevisions].[rework_counter]<='+ltrim(@count_return_to), N'1=1') --+


--select @param

--[SocialStates]
--@social_state_id nvarchar(max)
--,@applicant_type_id int
--,@question_type_id nvarchar(max)
--,@executor_organization_id nvarchar(max)
--,@assignment_result_id nvarchar(max)
--,@assignment_resolution_id nvarchar(max)
--,@receipt_source_id nvarchar(max)
--,@registration_date_from date
--,@registration_date_to date
--,@look_date_from date
--,@look_date_to date
--,@count_return_from int 
--,@count_return_to int
--формирование основного параметра конец

/* отдельные фильтра начало
,@age_id nvarchar(max) --отдельным фильтром 1
,@count_appeals_from int --отдельным фильтром 2
,@count_appeals_to int --отдельным фильтром 2
отдельные фильтра конец */ 

--нужные таблицы для параметра комментария
/*
[Assignments]
[Buildings]
[LiveAddress]
[Applicants]
[Questions]
[AssignmentConsiderations]
[Appeals]
[AssignmentRevisions]
*/
--формирование комментария на таблицы

declare @comment_LiveAddress nvarchar(max)=  -- вроде так
case 
	when @district_id is not null 
		or @street_id is not null
		or @building_id is not null
		or @entrance is not null
		or @flat is not null
	then N''
	else N'--'
	end

declare @comment_Buildings nvarchar(max)=  --вроде так
case 
	when @district_id is not null 
		or @street_id is not null
		or @building_id is not null
	then N''
	else N'--'
	end

declare @comment_Appeals nvarchar(max)=
case 
	when @receipt_source_id is not null 
		or @question_type_id is not null
		or @registration_date_from is not null
		or @registration_date_to is not null
		or @executor_organization_id is not null
		or @assignment_result_id is not null
		or @assignment_resolution_id is not null
		or @look_date_from is not null
		or @look_date_to is not null
		or @count_return_from is not null
		or @count_return_to is not null
	then N''
	else N'--'
	end

declare @comment_Questions nvarchar(max)=
case 
	when @question_type_id is not null
		or @registration_date_from is not null
		or @registration_date_to is not null
		or @executor_organization_id is not null
		or @assignment_result_id is not null
		or @assignment_resolution_id is not null
		or @look_date_from is not null
		or @look_date_to is not null
		or @count_return_from is not null
		or @count_return_to is not null
	then N''
	else N'--'
	end

declare @comment_Assignments nvarchar(max)=
case 
	when @executor_organization_id is not null
		or @assignment_result_id is not null
		or @assignment_resolution_id is not null
		or @look_date_from is not null
		or @look_date_to is not null
		or @count_return_from is not null
		or @count_return_to is not null
	then N''
	else N'--'
	end

declare @comment_AssignmentConsiderations nvarchar(max)=
case 
	when  @look_date_from is not null
		or @look_date_to is not null
		or @count_return_from is not null
		or @count_return_to is not null
	then N''
	else N'--'
	end

declare @comment_AssignmentRevisions nvarchar(max)=
case 
	when  @count_return_from is not null
		or @count_return_to is not null
	then N''
	else N'--'
	end

declare @join_count_appeals nvarchar(max)=
case 
	when @count_appeals_from is not null
         or @count_appeals_to is not null
	then N' inner join '
	else N' left join '
end

	--табличка для заявителей начало

	if object_id('tempdb..#temp_Applicants') is not NULL drop table #temp_Applicants
	create table #temp_Applicants (Id int, [full_name] nvarchar(500), [applicant_privilage_id] int, age int)

	declare @query_Applicants nvarchar(max)=
	N'
	select distinct [Applicants].Id, [Applicants].[full_name], [Applicants].[applicant_privilage_id], 
	case when format([Applicants].[birth_date], ''MMdd'')*1>=format(getutcdate(), ''MMdd'')
		then datediff(yy, [Applicants].[birth_date], getutcdate())
		else datediff(yy, [Applicants].[birth_date], getutcdate())-1
		end age
	from 
	--фільтр пільга, соціальний стан, тип заявника, вік??????
	[dbo].[Applicants]
	--фільтр під*їзд, квартира /будинку, району, вулиці
	'+@comment_LiveAddress+' inner join [dbo].[LiveAddress] on [Applicants].Id=[LiveAddress].applicant_id
	--фільтр будинку, району, вулиці
	'+@comment_Buildings+' inner join [dbo].[Buildings] on [LiveAddress].building_id=[Buildings].Id
	--фільтр тип питання, виконавець, результат, резолюція, дата надходження, джерело надходження, кількість повернень
	'+@comment_Appeals+' inner join [dbo].[Appeals] on [Appeals].applicant_id=[Applicants].Id
	'+@comment_Questions+' inner join [dbo].[Questions] on [Questions].appeal_id=[Appeals].Id
	--фільтр виконавець, результат, резолюція, дата розгляду, кількість повернень
	'+@comment_Assignments+' inner join [dbo].[Assignments] on [Questions].Id=[Assignments].question_id
	--фільтр дата розгляду, кількість повернень
	'+@comment_AssignmentConsiderations+' inner join [dbo].[AssignmentConsiderations] on [Assignments].current_assignment_consideration_id=[AssignmentConsiderations].Id
	--фільтр кількість повернень
	'+@comment_AssignmentRevisions+' inner join [dbo].[AssignmentRevisions] on [AssignmentConsiderations].Id=[AssignmentRevisions].assignment_consideration_іd
	where '+@param_no+N' and '+@param
	
	insert into #temp_Applicants (Id, [full_name], [applicant_privilage_id], age)
	exec(@query_Applicants)

	--select @query_Applicants
	--select * from #temp_Applicants
	--табличка для заявителей конец

	--табличка количество обращений начало 
	--if @count_appeals_from is not null or @count_appeals_to is not null
		--begin
			if object_id('tempdb..#temp_count_appeals') is not NULL drop table #temp_count_appeals
			create table #temp_count_appeals (applicant_id int, count_appeals int)

			declare @param_count_appeals_where nvarchar(max)=
			isnull(N'convert(date, [Questions].[registration_date])>='''+ltrim(convert(date,@registration_date_from))+N'''', N'1=1')+N' and ' --+
			+isnull(N'convert(date, [Questions].[registration_date])<='''+ltrim(convert(date,@registration_date_to))+N'''', N'1=1') --+

			declare @param_count_appeals_having nvarchar(max)=
			isnull(N'count(distinct [Appeals].Id)>='+ltrim(@count_appeals_from), N'1=1')+N' and '+
			isnull(N'count(distinct [Appeals].Id)<='+ltrim(@count_appeals_to), N'1=1')

			declare @query_count_appeals nvarchar(max)=
			N'
			select [Appeals].[applicant_id], count(distinct [Appeals].Id) count_appeals
			  from [dbo].[Appeals]
			  inner join #temp_Applicants t on [Appeals].[applicant_id]=t.Id
			  inner join [dbo].[Questions] on [Appeals].Id=[Questions].appeal_id
			  where '+@param_count_appeals_where+
			  N' group by [Appeals].[applicant_id]
			  having '+@param_count_appeals_having

			  --select @query_count_appeals
			  insert into #temp_count_appeals 
			  (applicant_id, count_appeals)
			  exec(@query_count_appeals)
		--end

		--select * from #temp_count_appeals
	--табличка количество обращений конец

	--формирование основной таблицы начало

	declare @query_main nvarchar(max)=
	N'
	select Id, full_name, phone_number_main, phone_number_add, adress, privilage, age, count_appeals

	from
	(
	select ap.Id, ap.full_name, 
	stuff((select N'', ''+[phone_number] from [dbo].[ApplicantPhones] 
	 where [phone_number] is not null and IsMain=''true'' and [applicant_id]=ap.Id for xml path('''')),1,2,N'''') phone_number_main, 
	 stuff((select N'', ''+[phone_number] from [dbo].[ApplicantPhones] 
	 where [phone_number] is not null and IsMain=''false'' and [applicant_id]=ap.Id for xml path('''')),1,2,N'''') phone_number_add,
	stuff((select N'', ''+isnull(st.shortname+N'' '',N'''')+isnull(s.name+N'' '',N'''')+isnull(N'', ''+b.name, N'''')+isnull(N'', кв.''+la.flat,N'''')
	  from [dbo].[LiveAddress] la
	  inner join [dbo].[Buildings] b on la.building_id=b.Id
	  left join [dbo].[Streets] s on b.street_id=s.Id
	  left join [dbo].[StreetTypes] st on s.street_type_id=st.Id
	  where la.main=''true'' and ap.Id=la.applicant_id
	  for xml path('''')),1,2,N'''') adress,
	pr.name privilage,
	ap.age,
	ca.count_appeals,
	case 
		when ap.age between 16 and 20 then 1
		when ap.age between 21 and 30 then 2
		when ap.age between 31 and 40 then 3
		when ap.age between 41 and 50 then 4
		when ap.age between 51 and 60 then 5
		when ap.age between 61 and 70 then 6
		when ap.age between 71 and 80 then 7
		when ap.age between 81 and 90 then 8
		when ap.age between 91 and 100 then 9
		when ap.age between 101 and 110 then 10
	end age_Id
	from #temp_Applicants ap
	'+@join_count_appeals+N' #temp_count_appeals ca on ap.Id=ca.applicant_id -- здесь inner
	left join ApplicantPrivilege pr on ap.applicant_privilage_id=pr.Id
	) t
	where '+isnull(N'age_id in ('+@age_id+N')',N'1=1')

	--select @query_main

	exec(@query_main)
	--формирование основной таблицы конец





-- select top 11 ap.Id, ap.[full_name], 
--   stuff((select N', '+[phone_number] from [dbo].[ApplicantPhones] 
--   where [phone_number] is not null and IsMain='true' and [applicant_id]=ap.Id for xml path('')),1,2,N'') phone_number_main, 
--   stuff((select N', '+[phone_number] from [dbo].[ApplicantPhones] 
--   where [phone_number] is not null and IsMain='false' and [applicant_id]=ap.Id for xml path('')),1,2,N'') phone_number_add,

--   stuff((select N', '+isnull(st.shortname+N' ',N'')+isnull(s.name+N' ',N'')+isnull(N', '+b.name, N'')+isnull(N', кв.'+la.flat,N'')
--   from [dbo].[LiveAddress] la
--   left join [dbo].[Buildings] b on la.building_id=b.Id
--   left join [dbo].[Streets] s on b.street_id=s.Id
--   left join [dbo].[StreetTypes] st on s.street_type_id=st.Id
--   where la.main='true' and ap.Id=la.applicant_id
--   for xml path('')),1,2,N'') adress,
--   --app.Name privilage,
--   --case when format(ap.birth_date, 'MMdd')*1>=format(getutcdate(), 'MMdd')
-- 		--then datediff(yy, ap.birth_date, getutcdate())
-- 		--else datediff(yy, ap.birth_date, getutcdate())-1
-- 		--end age,

-- 		27 age,
--   count(distinct appe.Id) count_appeals

--   --@parameter par

--   from [dbo].[Applicants] ap
--   left join [dbo].[ApplicantPrivilege] app on ap.applicant_privilage_id=app.id
--   left join [dbo].[Appeals] appe on ap.Id=appe.applicant_id
--   group by 
-- 	ap.Id, ap.[full_name], 
--   app.Name