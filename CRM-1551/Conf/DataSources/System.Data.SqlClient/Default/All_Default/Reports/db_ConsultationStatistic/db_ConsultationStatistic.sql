-- DECLARE @dateFrom DATE = DATEADD(DAY, -10, GETDATE());
-- DECLARE @dateTo DATE = GETDATE(); 
-- DECLARE @UserId NVARCHAR(MAX) = N'29796543-b903-48a6-9399-4840f6eac396,6234fd61-5832-4ecc-bd4f-bc4292e1808e,cd51bfe1-2406-46d0-a7dc-e26a43ada847';

DECLARE @UserList TABLE (Id NVARCHAR(128));

INSERT INTO @UserList
SELECT 
	value 
FROM STRING_SPLIT(@UserId, ',');

IF OBJECT_ID ('tempdb..#Knowledge') IS NOT NULL
BEGIN
	DROP TABLE #Knowledge;
END

CREATE TABLE #Knowledge ([Id] INT, 
						 [parent_id] INT,
						 [Name] NVARCHAR(300),
						 [article_qty] INT,
						 [article_percent] NUMERIC(5,2),
						 [talk_all] TIME,
						 [talk_consultations_only] TIME,
						 [talk_consultation_average] TIME
						 ) WITH (DATA_COMPRESSION = PAGE);
--> Общее значение консультаций
DECLARE @Knowledge_AllVal INT; 
SELECT 
	@Knowledge_AllVal = SUM(number_by_day)
FROM dbo.ConsultationStatistic;
--> Сбор данных по статистике типов 
INSERT INTO #Knowledge 
SELECT 
	0,
	NULL,
	N'Корень',
	0,
	0,
	'00:00:00',
	'00:00:00',
	'00:00:00'
UNION
SELECT 
	[Id],
	IIF([parent_id] = 3510017, 
		0, 
		ISNULL([parent_id],0) 
	  ) AS [parent_id],
	[name],
	SUM(ISNULL(cs.number_by_day,0)) AS [article_qty], 
    CASE WHEN ISNULL(cs.number_by_day,0) > 0 
		 THEN 
		 CAST(SUM(CAST(ISNULL(cs.number_by_day,0) AS NUMERIC(5,2))) 
		 / CAST(@Knowledge_AllVal AS NUMERIC(5,2)) AS NUMERIC(5,2)) * 100
		 ELSE 0 END 
  		AS [article_percent], 
    CONVERT(VARCHAR(15), DATEADD(SECOND,SUM(ISNULL(cs.duration,0)),0),108) 
  		AS [talk_all], 
    CONVERT(VARCHAR(15), DATEADD(SECOND,SUM(ISNULL(cs.duration_only_cons,0)),0),108) 
  		AS [talk_consultations_only], 
    CASE WHEN ISNULL(cs.number_only_cons,0) > 0 
		 THEN 
		 CONVERT(VARCHAR(15), DATEADD(SECOND,(SUM(ISNULL(cs.duration_only_cons,0)) / SUM(ISNULL(cs.number_only_cons,0))),0),108)
		 ELSE '00:00:00' END
  		AS [talk_consultation_average]
FROM dbo.KnowledgeBaseStates kn_base
LEFT JOIN dbo.ConsultationStatistic cs ON cs.article_id = kn_base.id
WHERE CAST(cs.main_datetime AS DATE)
	  BETWEEN @dateFrom AND @dateTo
  AND cs.[user_id] IN (SELECT Id FROM @UserList)
GROUP BY [parent_id], 
		 [Id], 
		 [name],
		 number_by_day,
		 number_only_cons
ORDER BY 2,1;
INSERT INTO #Knowledge
SELECT 
	[Id], 
	0,
	[Name],
	0,
	0,
	'00:00:00',
	'00:00:00',
	'00:00:00'
FROM dbo.KnowledgeBaseStates
WHERE (parent_id IS NULL
	OR parent_id = 3510017)
	AND [Id] NOT IN (SELECT Id FROM #Knowledge);

 --select * from #Knowledge;

IF OBJECT_ID('tempdb..#RootVals') IS NOT NULL
BEGIN
	DROP TABLE #RootVals;
END
SELECT 
	[Id],
	[parent_id],
	[Name],
	[article_qty],
	[article_percent],
	[talk_all],
	[talk_consultations_only],
	[talk_consultation_average] 
INTO #RootVals
FROM #Knowledge 
WHERE parent_id = 0;

DECLARE @RootCircle TABLE (Id INT);
INSERT INTO @RootCircle
SELECT 
	[Id]
FROM #RootVals;

--SELECT * FROM @RootCircle; 

DECLARE @Count SMALLINT = (SELECT COUNT(1) FROM @RootCircle);
DECLARE @Step TINYINT = 1;
DECLARE @Current INT;
DECLARE @StepValues TABLE (Id INT);

WHILE (@Step <= @Count)
BEGIN
	DELETE FROM @StepValues;
	SET @Current = (SELECT TOP 1 [Id] FROM @RootCircle);
	 
	WITH Knowledge_Rec ([Id], [parent_id], [Name])
	AS
	(
		SELECT [Id], 
			   [parent_id], 
			   [Name]
		FROM #Knowledge e
		WHERE e.Id = @Current 
		UNION ALL
		SELECT e.[Id], 
			   e.[parent_id], 
			   e.[Name]
		FROM #Knowledge e
		INNER JOIN Knowledge_Rec r ON e.parent_id = r.Id
	)
	
	INSERT INTO @StepValues
	SELECT 
		[Id]
	FROM Knowledge_Rec;

	UPDATE #RootVals
		SET [article_qty] = (SELECT SUM([article_qty]) FROM #Knowledge WHERE [Id] IN (SELECT [Id] FROM @StepValues)),
			[article_percent] = (SELECT SUM([article_percent]) FROM #Knowledge WHERE [Id] IN (SELECT [Id] FROM @StepValues)),
			[talk_all] = (SELECT DATEADD(ms, SUM(DATEDIFF(ms, 0, [talk_all])), 0) FROM #Knowledge WHERE [Id] IN (SELECT [Id] FROM @StepValues)),
			[talk_consultations_only] = (SELECT DATEADD(ms, SUM(DATEDIFF(ms, 0, [talk_consultations_only])), 0) FROM #Knowledge WHERE [Id] IN (SELECT [Id] FROM @StepValues)),
			[talk_consultation_average] = (SELECT DATEADD(ms, AVG(DATEDIFF(ms, 0, [talk_consultation_average])), 0) FROM #Knowledge WHERE [Id] IN (SELECT [Id] FROM @StepValues))
	WHERE [Id] = @Current;

	DELETE FROM @RootCircle
	WHERE Id = @Current;
	
	SET @Step +=1;
END

SELECT 
	[Id],
	[Name],
	[article_qty],
	[article_percent],
	[talk_all],
	[talk_consultations_only],
	[talk_consultation_average]
FROM #RootVals
ORDER BY [Name];