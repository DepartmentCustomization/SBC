-- USE CRM_AVR_Analitics 
--declare 
--@DateStart date = '2020-09-01 00:00:00',
--@DateEnd date = CAST(GETDATE() AS DATE),
--@orgId int = 6206;

SET
	@DateEnd = (
		SELECT
			EOMONTH (@DateStart)
	);

DECLARE @month INT = datepart(M, @DateStart),
		@year INT = datepart(YYYY, @DateStart);

DECLARE @monthDays AS TABLE (Num INT, [Date] DATE);
--- Получить список дней выбранного месяца

WITH numbers AS (
	SELECT
		1 AS value
	UNION
	ALL
	SELECT
		value + 1
	FROM
		numbers
	WHERE
		value + 1 <= DAY(EOMONTH(datefromparts(@year, @month, 1)))
)
INSERT INTO
	@monthDays
SELECT
	DAY(datefromparts(@year, @month, numbers.value)) Num,
	datefromparts(@year, @month, numbers.value) [Date]
FROM
	numbers;
	 --- Выбрать сводку по сотрудника организации и их работе за месяц + овертайм на следующий день
	DECLARE @ContactJob_WorkTime TABLE (
		rowNum INT,
		contId INT,
		contName NVARCHAR(300),
		jobId INT,
		jobName NVARCHAR(300),
		workDay TINYINT,
		workTime FLOAT(53),
		overtime FLOAT(53)
	);

INSERT INTO
	@ContactJob_WorkTime
SELECT
	ROW_NUMBER() OVER(
		ORDER BY
			c.Id,
			md.[Date] ASC
	) AS rowNum,
	c.Id contactId,
	c.[Name] contactName,
	j.Id AS jobId,
	j.Job_name AS jobName,
	md.num,
	--isnull(shp.Time_count,0),
	isnull(IIF(shp.Value IS NULL, shp.Time_count, NULL), 0),
	--isnull(
	--	iif(
	--	shp.Time_count + datepart(hh,shp.Plan_start_time)>24,
	--	shp.Time_count + datepart(hh,shp.Plan_start_time)-24,
	--	0),
	--0) as overtime
	isnull(
		iif(
			(IIF(shp.Value IS NULL, shp.Time_count, NULL)) + datepart(hh, shp.Plan_start_time) > 24,
			(IIF(shp.Value IS NULL, shp.Time_count, NULL)) + datepart(hh, shp.Plan_start_time) -24,
			0
		),
		0
	) AS overtime
FROM
	Contacts c
	JOIN Jobs j ON j.Contacts_ID = c.Id
	JOIN Shifts_Person shp ON shp.Job_Id = j.Id
	LEFT JOIN @monthDays md ON shp.[Shift_date] = md.[Date]
WHERE
	j.Organization_ID = @orgId
	AND year(Shift_date) = @year
	AND MONTH(Shift_date) = @month
ORDER BY
	c.Id,
	md.[Date];
	 --- Сформировать календарь дней-часов работы сотрудников с учетом овертайма
DECLARE @row_up TABLE (num INT, h NVARCHAR(5));
INSERT INTO
	@row_up
SELECT
	rowNum,
	N'-' + CAST(overtime AS NVARCHAR(10))
FROM
	@ContactJob_WorkTime
WHERE
	overtime <> 0;

INSERT INTO
	@row_up
SELECT
	rowNum + 1,
	'+' + cast(overtime AS NVARCHAR(10))
FROM
	@ContactJob_WorkTime
WHERE
	overtime <> 0;

UPDATE
	@ContactJob_WorkTime
SET
	workTime += CAST(RIGHT(u.h, LEN(u.h) -1) AS FLOAT(53))
FROM 
	@ContactJob_WorkTime c
	JOIN @row_up u ON c.rowNum = u.num
WHERE
	u.num IN (
		SELECT
			num
		FROM
			@row_up
		WHERE
			LEFT(h, 1) = N'+'
	);
UPDATE
	@ContactJob_WorkTime
SET
	workTime -= CAST(RIGHT(u.h, LEN(u.h) -1) AS FLOAT(53))
FROM
	@ContactJob_WorkTime c
	JOIN @row_up u ON c.rowNum = u.num
WHERE
	u.num IN (
		SELECT
			num
		FROM
			@row_up
		WHERE
			left(h, 1) = N'-'
	);

DECLARE @monthSum TABLE (contId INT, workHours FLOAT(53));

INSERT INTO
	@monthSum
SELECT
	contId,
	sum(workTime)
FROM
	@ContactJob_WorkTime
GROUP BY
	contId;

SELECT
	piv.*,
	ms.workHours AS MonthWorkTime
FROM
	(
		SELECT
			contId AS ContactId,
			contName AS ContactName,
			jobName AS JobName,
			workDay,
			workTime
		FROM
			@ContactJob_WorkTime c
			JOIN (
				SELECT
					sum(workTime) Ztime,
					rowNum
				FROM
					@ContactJob_WorkTime
				GROUP BY
					rowNum
			) zx ON zx.rowNum = c.rowNum
	) t PIVOT (
		SUM(t.workTime) FOR workDay IN (
			[1],
			[2],
			[3],
			[4],
			[5],
			[6],
			[7],
			[8],
			[9],
			[10],
			[11],
			[12],
			[13],
			[14],
			[15],
			[16],
			[17],
			[18],
			[19],
			[20],
			[21],
			[22],
			[23],
			[24],
			[25],
			[26],
			[27],
			[28],
			[29],
			[30],
			[31]
		)
	) piv
	JOIN @monthSum ms ON ms.contId = piv.ContactId;