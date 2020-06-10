select f.Id, [Districts].name+N'-'+[QuestionTypes].name filter_name,
  [Districts].Id district_id, [Districts].name district_name,
  [QuestionTypes].Id questiondirection_id, [QuestionTypes].name questiondirection_name
  from [dbo].[FiltersForControler] f
  inner join [dbo].[Districts] on f.district_id=[Districts].Id
  inner join [dbo].[QuestionTypes] on f.questiondirection_id=[QuestionTypes].Id
  where f.user_id=@user_id