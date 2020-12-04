-- DECLARE @user_id NVARCHAR(128) = N'5b37daab-e5bd-46c4-bb26-e04d160ec966';

SELECT
  aqt.Id,
  aqt.[question_type_id],
  [QuestionTypes].[name] AS [question_type_name],
  qt_par.Id AS [parent_question_type_id],
  qt_par.[name] AS [parent_question_type_name],
  aqt.[object_id],
  [Objects].[name] AS [object_name],
  aqt.[statecode]
FROM
  [dbo].[AttentionQuestionAndEvent] aqt
  LEFT JOIN [dbo].[QuestionTypes] [QuestionTypes] ON aqt.question_type_id = [QuestionTypes].Id
  LEFT JOIN [dbo].[Objects] [Objects] ON aqt.[object_id] = [Objects].Id
  LEFT JOIN [dbo].[QuestionTypes] qt_par ON [QuestionTypes].question_type_id = qt_par.Id
WHERE
  aqt.[user_id] = @user_id
  AND aqt.is_active = 1
  AND #filter_columns#
      #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;
