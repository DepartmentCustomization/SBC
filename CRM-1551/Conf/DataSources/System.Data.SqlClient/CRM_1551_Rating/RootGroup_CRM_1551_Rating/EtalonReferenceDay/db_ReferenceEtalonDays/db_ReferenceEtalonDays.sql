--   DECLARE @dateFrom DATE='2018-01-01';
--   DECLARE @dateTo DATE='2020-12-12';

  DECLARE @date DATE = GETUTCDATE();--CONVERT(DATE,'2019-09-25 17:37:06.090');
--DECLARE @date DATE = CONVERT(DATE,'2019-09-25 17:37:06.090');
  SELECT [QuestionTypes].Id,
  [QuestionTypes].Id QuestionTypes_Id, 
  [QuestionTypes].name QuestionTypes_Name, --1
  [Rating_EtalonDaysToExecution].EtalonDaysToExecution, --2
  CONVERT(NUMERIC(8,2),avg_EtalonDaysToExecution.avg_EtalonDaysToExecution) avg_EtalonDaysToExecution, --3
  CONVERT(NUMERIC(8,2),avg_EtalonDaysToExecution.avg_EtalonDaysToExecution) avg_EtalonDaysToExecution_change, --4 МОЖЛИВІСТЬ ЗМІНИ
  [Rating_EtalonDaysToExecution].[EtalonDaysToExplain], --5
  CONVERT(NUMERIC(8,2),avg_EtalonDaysToExplain.avg_EtalonDaysToExplain) avg_EtalonDaysToExplain, --6
  CONVERT(NUMERIC(8,2),avg_EtalonDaysToExplain.avg_EtalonDaysToExplain) avg_EtalonDaysToExplain_change, --7 МОЖЛИВІСТЬ ЗМІНИ
  [Rating_EtalonDaysToExecution].DateStart --8
  FROM [dbo].[Rating_EtalonDaysToExecution]
  INNER JOIN [CRM_1551_Analitics].[dbo].[QuestionTypes] ON [Rating_EtalonDaysToExecution].QuestionTypeId=[QuestionTypes].Id


  LEFT JOIN 
  (SELECT QuestionTypeId, AVG(CONVERT(FLOAT,EtalonDaysToExecution)) avg_EtalonDaysToExecution
  FROM [dbo].[Rating_EtalonDaysToExecution]
  WHERE EtalonDaysToExecution IS NOT NULL AND CONVERT(DATE, [Rating_EtalonDaysToExecution].[CreatedAt]) 
  BETWEEN CONVERT(DATE,@dateFrom) AND CONVERT(DATE,@dateTo)
  GROUP BY QuestionTypeId) avg_EtalonDaysToExecution ON [Rating_EtalonDaysToExecution].QuestionTypeId=avg_EtalonDaysToExecution.QuestionTypeId

  LEFT JOIN 
  (SELECT QuestionTypeId, AVG(CONVERT(FLOAT,EtalonDaysToExplain)) avg_EtalonDaysToExplain
  FROM [dbo].[Rating_EtalonDaysToExecution]
  WHERE EtalonDaysToExplain IS NOT NULL AND CONVERT(DATE, [Rating_EtalonDaysToExecution].[CreatedAt]) 
  BETWEEN CONVERT(DATE,@dateFrom) AND CONVERT(DATE,@dateTo)
  GROUP BY QuestionTypeId) avg_EtalonDaysToExplain ON [Rating_EtalonDaysToExecution].QuestionTypeId=avg_EtalonDaysToExplain.QuestionTypeId

  WHERE CONVERT(DATE, [Rating_EtalonDaysToExecution].[CreatedAt])=@date

--   AND #filter_columns#
--   #sort_columns#
