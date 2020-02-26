    --  use CRM_AVR_Analitics
    --  declare 
    --  @DateStart date = '2019-10-01 00:00:00';
    --  @contId int = 8275;
    
declare @DateEnd date; 
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

declare @Cont_workDay_Note table (
contId int, 
workDay tinyint,
note nvarchar(5));

insert into @Cont_workDay_Note
select 
c.Id as contactId,
md.num, 
shd.ShortName as note
from Contacts c
join Jobs j on j.Id = c.Job_ID
join Shifts_Person shp on shp.Job_Id = j.Id
left join Schedule_dir shd on shp.Value = shd.Id
left join @monthDays md on shp.[Shift_date] = md.[Date]
where c.Id = @ContactId
and year(Shift_date) = @year 
and month(Shift_date) = @month
order by c.Id, md.[Date]

select * from @Cont_workDay_Note