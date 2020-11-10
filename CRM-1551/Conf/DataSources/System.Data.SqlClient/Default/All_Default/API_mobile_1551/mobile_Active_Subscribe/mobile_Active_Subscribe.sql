--declare @user_id nvarchar(128)=N'29796543-b903-48a6-9399-4840f6eac396';

  select aqt.Id, aqt.[question_type_id], [QuestionTypes].name question_type_name,
  qt_par.Id parent_question_type_id, qt_par.name parent_question_type_name,
  aqt.object_id, [Objects].name object_name, aqt.statecode
  from [dbo].[AttentionQuestionAndEvent] aqt
  left join [dbo].[QuestionTypes] on aqt.question_type_id=[QuestionTypes].Id
  left join [dbo].[Objects] on aqt.object_id=[Objects].Id
  left join [dbo].[QuestionTypes] qt_par on [QuestionTypes].question_type_id=qt_par.Id
  where aqt.user_id=@user_id
  and  #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only