--на нижние таблички
  --параметры
  --declare @navigator nvarchar(50)=N'Усі';--Усі
  --declare @column nvarchar(50)=N'overdue';

  declare @navigator_q nvarchar(max)=
  case when @navigator=N'Усі' then (select stuff((select N', '+ltrim(Id)--, emergensy_name name
  from [dbo].[Emergensy]
  for xml path('')), 1, 2, N'')+N',0')
	   when @navigator=N'Заходи' then N'0'
	   when @navigator is not null 
								  then (select ltrim(Id)--, emergensy_name name
								  from [dbo].[Emergensy]
								  where [emergensy_name]=@navigator)
		end


  --select @navigator_q

  declare @where nvarchar(max)=
  case  when @column=N'arrived'
			then N'[Assignments].[assignment_state_id]=1 ' /*Зареєстровано*/
		when @column=N'in_work'
			then N'[Assignments].[assignment_state_id]=2 ' /*В роботі*/
		when @column=N'attention'
			then N'getutcdate() between dateadd(HH, [QuestionTypes].Attention_term_hours, [Assignments].registration_date) and [Assignments].execution_date'
		when @column=N'overdue'
			then N'[Assignments].execution_date<getutcdate()'
		when @column=N'for_revision'
			then N'[Assignments].[assignment_state_id]=4 /*Не виконано*/ and [Assignments].AssignmentResultsId=5 /*На доопрацювання*/ ' /*Зареєстровано переделать на доопрацюванні*/
	    when @column=N'future'
			then N'[Assignments].registration_date>getutcdate()'
		when @column=N'without_executor'
			then N'[Assignments].executor_organization_id=1762'
		else N'1=2'
		end

  declare @where_event nvarchar(max)=
  case
		when @column=N'in_work'
			then N'[Events].active=''true'' and [start_date]<getutcdate() and [plan_end_date]>getutcdate()'
		when @column=N'overdue'
			then N'[Events].active=''true'' and [plan_end_date]<getutcdate()'
		when @column=N'future'
			then N'[Events].start_date>getutcdate()'
		else N'1=2'
		end

  declare @query1 nvarchar(max)=N'
 
  SELECT
[Assignments].Id,
[Questions].registration_number,
[Assignments].[registration_date],
[QuestionTypes].name QuestionType,
[StreetTypes].shortname + Streets.name + N'', '' + [Buildings].name place_problem,
[Assignments].[execution_date] control_date,
[Organizations].short_name vykonavets,
[AssignmentConsiderations].short_answer comment,
[Applicants].full_name zayavnyk,
[Applicants].[ApplicantAdress] ZayavnykAdress,
[Questions].question_content content
FROM
[dbo].[Assignments] WITH (nolock)
INNER JOIN [dbo].[Questions] WITH (nolock) ON [Assignments].question_id = [Questions].Id
INNER JOIN [dbo].[Appeals] WITH (nolock) ON [Questions].appeal_id = [Appeals].Id
INNER JOIN [ReceiptSources] WITH (nolock) ON [Appeals].receipt_source_id = [ReceiptSources].Id
INNER JOIN [QuestionTypes] WITH (nolock) ON [Questions].question_type_id = [QuestionTypes].Id
LEFT JOIN [Applicants] WITH (nolock) ON [Appeals].applicant_id = [Applicants].Id
LEFT JOIN [Objects] WITH (nolock) ON [Questions].[object_id] = [Objects].Id
LEFT JOIN [Buildings] WITH (nolock) ON [Objects].builbing_id = [Buildings].Id
LEFT JOIN [Streets] WITH (nolock) ON [Buildings].street_id = [Streets].Id
LEFT JOIN [StreetTypes] WITH (nolock) ON [Streets].street_type_id = [StreetTypes].Id
LEFT JOIN [Organizations] WITH (nolock) ON [Assignments].executor_organization_id = [Organizations].Id
LEFT JOIN [dbo].[AssignmentConsiderations] WITH (nolock) ON [AssignmentConsiderations].Id = Assignments.current_assignment_consideration_id
where [QuestionTypes].emergency in ('+@navigator_q+N') and '+@where
--union all

declare @query2 nvarchar(max)=N'

select [Events].[Id]*(-1) Id, 
  LTRIM([Events].Id) registration_number, 
  [Events].[registration_date], 
  [Event_Class].name QuestionType,
  [StreetTypes].shortname + Streets.name + N'', '' + [Buildings].name place_problem,
  [Events].plan_end_date control_date,
  [Organizations].short_name vykonavets,
  [Events].comment,
  null zayavnyk,
  null ZayavnykAdress,
  null content
  from [dbo].[Events] WITH (nolock)
  left join [dbo].[Event_Class] WITH (nolock) on [Events].event_class_id=[Event_Class].Id
  left join [dbo].[EventObjects] WITH (nolock) on [Events].Id=[EventObjects].event_id and [EventObjects].in_form=''true''
  left join [dbo].[Objects] WITH (nolock) on [EventObjects].object_id=[Objects].Id
  LEFT JOIN [dbo].[Buildings] WITH (nolock) ON [Objects].builbing_id = [Buildings].Id
  LEFT JOIN [dbo].[Streets] WITH (nolock) ON [Buildings].street_id = [Streets].Id
  LEFT JOIN [dbo].[StreetTypes] WITH (nolock) ON [Streets].street_type_id = [StreetTypes].Id
  left join [dbo].[EventOrganizers] WITH (nolock) on [Events].Id=[EventOrganizers].event_id and [EventOrganizers].main=''true''
  left join [dbo].[Organizations] WITH (nolock) on [EventOrganizers].organization_id=[Organizations].Id
  where '+@where_event

  declare @query nvarchar(max)=
  case when charindex(N',',@navigator_q, 1)>0 
		then @query1+N' union all '+@query2
		when @navigator_q=N'0' then @query2
		else @query1 
		end

  --select len(@query)

  exec (@query)

