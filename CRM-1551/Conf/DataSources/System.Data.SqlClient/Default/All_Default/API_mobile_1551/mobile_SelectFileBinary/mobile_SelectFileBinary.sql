--  DECLARE @Id INT = 1352,
--  		 @table NVARCHAR(MAX) = N'QuestionDocFiles';

IF (@table = N'AssignmentConsDocFiles')
BEGIN
	SELECT
		[File] 
	FROM [dbo].[AssignmentConsDocFiles] WITH (NOLOCK) 
	WHERE [Id] = @Id
	ORDER BY 1
	OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;
END

ELSE IF (@table = N'QuestionDocFiles')
BEGIN
	SELECT
		[File] 
	FROM [dbo].[QuestionDocFiles] WITH (NOLOCK)
	WHERE [Id] = @Id
	ORDER BY 1
	OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;
END

ELSE IF (@table = N'EventFiles')
BEGIN
	SELECT 
		[File]
	FROM [dbo].[EventFiles] WITH (NOLOCK)
	WHERE [Id] = @Id
	ORDER BY 1
	OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;
END