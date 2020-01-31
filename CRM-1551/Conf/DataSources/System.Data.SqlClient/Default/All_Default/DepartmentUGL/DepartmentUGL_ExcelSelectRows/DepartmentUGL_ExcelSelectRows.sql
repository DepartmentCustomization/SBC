/*declare @dateFrom date;
declare @dateTo date;
declare @user_id nvarchar(128);
declare @is_worked bit;
*/
IF @is_worked IS NOT NULL
BEGIN

	SELECT
		Z.Id
	   ,Z.[№ звернення] [EnterNumber]
	   ,Z.[Створено] [RegistrationDate]
	   ,Z.[Заявник] [Applicant]
	   ,Z.[Адреса] [Address]
	   ,Z.[Зміст] [Content]
	   --,Z.[Питання] QuestionNumber
	   ,q.registration_number QuestionNumber
	FROM [dbo].[Звернення УГЛ] z
	LEFT JOIN [dbo].[Questions] q ON Z.Appeals_id=q.appeal_id
	WHERE CONVERT(DATE, Z.[Створено]) BETWEEN @dateFrom AND @dateTo
	AND #filter_columns# /*[Опрацював]=@user_id*/
	AND Z.[Опрацьовано] = @is_worked

-- #sort_columns#
--  offset @pageOffsetRows rows fetch next @pageLimitRows rows only

END

IF @is_worked IS NULL
BEGIN
	SELECT
		Z.Id
	   ,Z.[№ звернення] [EnterNumber]
	   ,Z.[Створено] [RegistrationDate]
	   ,Z.[Заявник] [Applicant]
	   ,Z.[Адреса] [Address]
	   ,Z.[Зміст] [Content]
	   ,Z.[Питання] QuestionNumber
	FROM [dbo].[Звернення УГЛ] z
	LEFT JOIN [dbo].[Questions] q ON Z.Appeals_id=q.appeal_id
	WHERE CONVERT(DATE,Z.[Створено]) BETWEEN @dateFrom AND @dateTo
	AND #filter_columns# /*[Опрацював]=@user_id*/
END