     use CRM_AVR_Analitics
     --declare 
     --@DateStart date = '2020-01-01 00:00:00',
     --@DateEnd date = '2020-01-01 00:00:00',
     --@orgId int = 6205;

set @DateEnd = (SELECT EOMONTH (@DateStart ) );

declare 
@month int = datepart(M, @DateStart),
@year int = datepart(YYYY, @DateStart);

declare @monthDays AS table (Num int, [Date] date)
--- Получить список дней выбранного месяца
;WITH numbers
as
(
    Select 1 as value
    union ALL
    Select value + 1 from numbers
    where value + 1 <= Day(EOMONTH(datefromparts(@year,@month,1)))
)
insert into @monthDays
SELECT 
DAY(datefromparts(@year,@month,numbers.value)) Num, 
datefromparts(@year,@month,numbers.value) [Date]
FROM numbers
--- Выбрать сводку по сотрудника организации и их работе за месяц + овертайм на следующий день
declare @ContactJob_WorkTime table (
rowNum int,
contId int, contName nvarchar(300),
jobId int, jobName nvarchar(300),
workDay tinyint,
workTime float,
overtime float);

insert into @ContactJob_WorkTime
select 
	ROW_NUMBER() OVER(ORDER BY c.Id, md.[Date] ASC) as rowNum,
	c.Id contactId,
	c.[Name] contactName,
	j.Id as jobId,
	j.Job_name as jobName,
	md.num,
	--isnull(shp.Time_count,0),
	isnull(IIF(shp.Value is null,shp.Time_count, NULL),0),
	--isnull(
	--	iif(
	--	shp.Time_count + datepart(hh,shp.Plan_start_time)>24,
	--	shp.Time_count + datepart(hh,shp.Plan_start_time)-24,
	--	0),
	--0) as overtime
	isnull(
		iif(
		(IIF(shp.Value is null,shp.Time_count, NULL)) + datepart(hh,shp.Plan_start_time)>24,
		(IIF(shp.Value is null,shp.Time_count, NULL)) + datepart(hh,shp.Plan_start_time)-24,
		0),
	0) as overtime
from Contacts c
join Jobs j on j.Contacts_ID = c.external_Id
join Shifts_Person shp on shp.Job_Id = j.Id
left join @monthDays md on shp.[Shift_date] = md.[Date]
where j.Organization_ID = @orgId 
and year(Shift_date) = @year 
and month(Shift_date) = @month
order by c.Id, md.[Date]
--- Сформировать календарь дней-часов работы сотрудников с учетом овертайма
declare @row_up table (num int, h nvarchar(5))
insert into @row_up
select 
rowNum, '-' + cast(overtime as nvarchar)
from @ContactJob_WorkTime
where overtime <> 0

insert into @row_up 
select 
rowNum+1, '+' + cast(overtime as nvarchar)
from @ContactJob_WorkTime
where overtime <> 0

update @ContactJob_WorkTime 
set workTime += cast(right(u.h,len(u.h)-1)as float)
from @ContactJob_WorkTime c 
join @row_up u on c.rowNum = u.num 
where u.num in (select num from @row_up where left(h,1) = '+' )

update @ContactJob_WorkTime 
set workTime -= cast(right(u.h,len(u.h)-1)as float)
from @ContactJob_WorkTime c 
join @row_up u on c.rowNum = u.num 
where u.num in (select num from @row_up where left(h,1) = '-' )

declare @monthSum table (contId int, workHours float);
insert into @monthSum 
select contId, sum(workTime)
from @ContactJob_WorkTime
group by contId


select piv.*, ms.workHours as MonthWorkTime
from (
select 
contId as ContactId,
contName as ContactName, 
jobName as JobName,
workDay, workTime
from @ContactJob_WorkTime c
join (select sum(workTime) Ztime, rowNum from @ContactJob_WorkTime group by rowNum) zx on zx.rowNum = c.rowNum
) t
PIVOT (
  SUM(t.workTime)
  FOR workDay in (
  [1], [2], [3], [4], [5], [6], [7], [8],[9], [10],
  [11], [12], [13], [14], [15], [16], [17], [18], [19], [20], 
  [21], [22], [23], [24], [25], [26], [27], [28], [29], [30], [31]
  )
) piv
join @monthSum ms on ms.contId = piv.ContactId