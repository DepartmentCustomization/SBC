-- DECLARE @appealNum NVARCHAR(400) = N'9-5, 9-470, 9-1000, 9-994, 9-986, Вася привет,Вася пока';

DECLARE @input_str NVARCHAR(max) = REPLACE(@appealNum, N', ', N',') + N', ';
-- создаем таблицу в которую будем записывать наши айдишники
DECLARE @table TABLE (id NVARCHAR(500)); -- создаем переменную, хранящую разделитель
DECLARE @delimeter NVARCHAR(2) = ','; -- определяем позицию первого разделителя
DECLARE @pos INT = charindex(@delimeter, @input_str); -- создаем переменную для хранения одного айдишника
DECLARE @id NVARCHAR(500);

WHILE (@pos != 0) 
BEGIN -- получаем айдишник
SET
	@id = SUBSTRING(@input_str, 1, @pos -1); -- записываем в таблицу
INSERT INTO
	@table (id)
VALUES
(@id) ;
    -- сокращаем исходную строку на
	-- размер полученного айдишника
	-- и разделителя
SET
	@input_str = SUBSTRING(@input_str, @pos + 1, LEN(@input_str)); -- определяем позицию след. разделителя
SET
	@pos = CHARINDEX(@delimeter, @input_str);
END 
--select * from @table

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @IsHere BIT = IIF(
   (
      SELECT
         COUNT(1)
      FROM
         dbo.Appeals
      WHERE
         registration_number IN (SELECT id FROM @table)
   ) = 0,
   0,
   1
);

IF(@IsHere = 1)
BEGIN
SELECT
	t.*
FROM
	(
		SELECT
			[Assignments].Id,
			[ReceiptSources].name navigation,
			[Questions].registration_number,
			[QuestionTypes].name QuestionType,
			[Applicants].full_name zayavnyk,
			[StreetTypes].shortname + Streets.name + N', ' + [Buildings].name adress,
			[Organizations].short_name vykonavets,
			[Applicants].Id zayavnykId,
			[Questions].Id QuestionId,
			[AssignmentConsiderations].short_answer,
			[Questions].question_content,
			[Applicants].[ApplicantAdress] adressZ
		FROM
			[Assignments] [Assignments] WITH (nolock)
			INNER JOIN [Questions] [Questions] WITH (nolock) ON [Assignments].question_id = [Questions].Id
			INNER JOIN [Appeals] [Appeals] WITH (nolock) ON [Questions].appeal_id = [Appeals].Id
			INNER JOIN [ReceiptSources] [ReceiptSources] WITH (nolock) ON [Appeals].receipt_source_id = [ReceiptSources].Id
			LEFT JOIN [QuestionTypes] [QuestionTypes] WITH (nolock) ON [Questions].question_type_id = [QuestionTypes].Id
			LEFT JOIN [Applicants] [Applicants] WITH (nolock) ON [Appeals].applicant_id = [Applicants].Id
			LEFT JOIN [Objects] [Objects] WITH (nolock) ON [Questions].[object_id] = [Objects].Id
			LEFT JOIN [Buildings] [Buildings] WITH (nolock) ON [Objects].builbing_id = [Buildings].Id
			LEFT JOIN [Streets] [Streets] WITH (nolock) ON [Buildings].street_id = [Streets].Id
			LEFT JOIN [StreetTypes] [StreetTypes] WITH (nolock) ON [Streets].street_type_id = [StreetTypes].Id
			LEFT JOIN [Organizations] [Organizations] WITH (nolock) ON [Assignments].executor_organization_id = [Organizations].Id
			LEFT JOIN [AssignmentConsiderations] [AssignmentConsiderations] WITH (nolock) ON [AssignmentConsiderations].Id = Assignments.current_assignment_consideration_id
		WHERE
			(
				[Appeals].registration_number IN (
					SELECT
						Id
					FROM
						@table o
				)
			) -- = @appealNum
		UNION
		SELECT
			[Assignments].Id,
			[ReceiptSources].name navigation,
			[Questions].registration_number,
			[QuestionTypes].name QuestionType,
			[Applicants].full_name zayavnyk,
			[StreetTypes].shortname + Streets.name + N', ' + [Buildings].name adress,
			[Organizations].short_name vykonavets,
			[Applicants].Id zayavnykId,
			[Questions].Id QuestionId,
			[AssignmentConsiderations].short_answer,
			[Questions].question_content,
			[Applicants].[ApplicantAdress] adressZ
		FROM
			[Assignments] [Assignments] WITH (nolock)
			INNER JOIN [Questions] [Questions] WITH (nolock) ON [Assignments].question_id = [Questions].Id
			INNER JOIN [Appeals] [Appeals] WITH (nolock) ON [Questions].appeal_id = [Appeals].Id
			INNER JOIN [ReceiptSources] [ReceiptSources] WITH (nolock) ON [Appeals].receipt_source_id = [ReceiptSources].Id
			LEFT JOIN [QuestionTypes] [QuestionTypes] WITH (nolock) ON [Questions].question_type_id = [QuestionTypes].Id
			LEFT JOIN [Applicants] [Applicants] WITH (nolock) ON [Appeals].applicant_id = [Applicants].Id
			LEFT JOIN [Objects] [Objects] WITH (nolock) ON [Questions].[object_id] = [Objects].Id
			LEFT JOIN [Buildings] [Buildings] WITH (nolock) ON [Objects].builbing_id = [Buildings].Id
			LEFT JOIN [Streets] [Streets] WITH (nolock) ON [Buildings].street_id = [Streets].Id
			LEFT JOIN [StreetTypes] [StreetTypes] WITH (nolock) ON [Streets].street_type_id = [StreetTypes].Id
			LEFT JOIN [Organizations] [Organizations] WITH (nolock) ON [Assignments].executor_organization_id = [Organizations].Id
			LEFT JOIN [AssignmentConsiderations] [AssignmentConsiderations] WITH (nolock) ON [AssignmentConsiderations].Id = Assignments.current_assignment_consideration_id
		WHERE
			(
				[Appeals].[enter_number] IN (
					SELECT
						Id
					FROM
						@table o
				)
			) -- = @appealNum
	) t 
WHERE
	#filter_columns#
	#sort_columns#
	OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;
END

ELSE IF(@IsHere = 0)
BEGIN
---> Check is connection to Archive db exists
DECLARE @ServerID SMALLINT = (SELECT server_id FROM sys.servers WHERE [name] = @Archive);

  IF(@ServerID IS NULL)
	BEGIN
		RETURN;
	END

	ELSE 
	BEGIN 
DECLARE @Query NVARCHAR(MAX) = 
N'DECLARE @input_str NVARCHAR(max) = REPLACE(@appealNum, N'', '', N'','') + N'', '';
-- создаем таблицу в которую будем записывать наши айдишники
DECLARE @table TABLE (id NVARCHAR(500)); -- создаем переменную, хранящую разделитель
DECLARE @delimeter NVARCHAR(2) = '',''; -- определяем позицию первого разделителя
DECLARE @pos INT = charindex(@delimeter, @input_str); -- создаем переменную для хранения одного айдишника
DECLARE @id NVARCHAR(500);

WHILE (@pos != 0) 
BEGIN -- получаем айдишник
SET
	@id = SUBSTRING(@input_str, 1, @pos -1); -- записываем в таблицу
INSERT INTO
	@table (id)
VALUES
(@id) ;
    -- сокращаем исходную строку на
	-- размер полученного айдишника
	-- и разделителя
SET
	@input_str = SUBSTRING(@input_str, @pos + 1, LEN(@input_str)); -- определяем позицию след. разделителя
SET
	@pos = CHARINDEX(@delimeter, @input_str);
END 

SELECT
	t.*
FROM
	(
		SELECT
			[Assignments].Id,
			[ReceiptSources].name navigation,
			[Questions].registration_number,
			[QuestionTypes].name QuestionType,
			[Applicants].full_name zayavnyk,
			[StreetTypes].shortname + Streets.name + N'', '' + [Buildings].name adress,
			[Organizations].short_name vykonavets,
			[Applicants].Id zayavnykId,
			[Questions].Id QuestionId,
			[AssignmentConsiderations].short_answer,
			[Questions].question_content,
			[Applicants].[ApplicantAdress] adressZ
		FROM
			[10.192.200.182].[CRM_1551_Analitics].[dbo].[Assignments] WITH (nolock)
			INNER JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[Questions] WITH (nolock) ON [Assignments].question_id = [Questions].Id
			INNER JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[Appeals] WITH (nolock) ON [Questions].appeal_id = [Appeals].Id
			INNER JOIN [ReceiptSources] WITH (nolock) ON [Appeals].receipt_source_id = [ReceiptSources].Id
			LEFT JOIN [QuestionTypes] WITH (nolock) ON [Questions].question_type_id = [QuestionTypes].Id
			LEFT JOIN [Applicants] WITH (nolock) ON [Appeals].applicant_id = [Applicants].Id
			LEFT JOIN [Objects] WITH (nolock) ON [Questions].[object_id] = [Objects].Id
			LEFT JOIN [Buildings] WITH (nolock) ON [Objects].builbing_id = [Buildings].Id
			LEFT JOIN [Streets] WITH (nolock) ON [Buildings].street_id = [Streets].Id
			LEFT JOIN [StreetTypes] WITH (nolock) ON [Streets].street_type_id = [StreetTypes].Id
			LEFT JOIN [Organizations] WITH (nolock) ON [Assignments].executor_organization_id = [Organizations].Id
			LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[AssignmentConsiderations] WITH (nolock) ON [AssignmentConsiderations].Id = Assignments.current_assignment_consideration_id
		WHERE
			(
				[Appeals].registration_number IN (
					SELECT
						Id
					FROM
						@table o
				)
			) -- = @appealNum
		UNION
		SELECT
			[Assignments].Id,
			[ReceiptSources].name navigation,
			[Questions].registration_number,
			[QuestionTypes].name QuestionType,
			[Applicants].full_name zayavnyk,
			[StreetTypes].shortname + Streets.name + N'', '' + [Buildings].name adress,
			[Organizations].short_name vykonavets,
			[Applicants].Id zayavnykId,
			[Questions].Id QuestionId,
			[AssignmentConsiderations].short_answer,
			[Questions].question_content,
			[Applicants].[ApplicantAdress] adressZ
		FROM
			[10.192.200.182].[CRM_1551_Analitics].[dbo].[Assignments] WITH (nolock)
			INNER JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[Questions] WITH (nolock) ON [Assignments].question_id = [Questions].Id
			INNER JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[Appeals] WITH (nolock) ON [Questions].appeal_id = [Appeals].Id
			INNER JOIN [ReceiptSources] WITH (nolock) ON [Appeals].receipt_source_id = [ReceiptSources].Id
			LEFT JOIN [QuestionTypes] WITH (nolock) ON [Questions].question_type_id = [QuestionTypes].Id
			LEFT JOIN [Applicants] WITH (nolock) ON [Appeals].applicant_id = [Applicants].Id
			LEFT JOIN [Objects] WITH (nolock) ON [Questions].[object_id] = [Objects].Id
			LEFT JOIN [Buildings] WITH (nolock) ON [Objects].builbing_id = [Buildings].Id
			LEFT JOIN [Streets] WITH (nolock) ON [Buildings].street_id = [Streets].Id
			LEFT JOIN [StreetTypes] WITH (nolock) ON [Streets].street_type_id = [StreetTypes].Id
			LEFT JOIN [Organizations] WITH (nolock) ON [Assignments].executor_organization_id = [Organizations].Id
			LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[AssignmentConsiderations] WITH (nolock) ON [AssignmentConsiderations].Id = Assignments.current_assignment_consideration_id
		WHERE
			(
				[Appeals].[enter_number] IN (
					SELECT
						Id
					FROM
						@table o
				)
			) -- = @appealNum
	) t
WHERE
	#filter_columns#
	#sort_columns#
	OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ; ' ;

  EXEC sp_executesql @Query, N'@appealNum NVARCHAR(400)', 
							@appealNum = @appealNum ;
END
END