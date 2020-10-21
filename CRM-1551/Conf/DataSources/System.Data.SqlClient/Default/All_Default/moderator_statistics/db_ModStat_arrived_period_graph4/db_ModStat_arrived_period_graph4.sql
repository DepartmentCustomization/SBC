
/*
declare @date_from datetime='2019-06-20 12:10:02'
declare @date_to datetime='2020-07-01 12:10:02'
declare @user_Ids nvarchar(max)=N'29796543-b903-48a6-9399-4840f6eac396,Вася'
*/

if OBJECT_ID('tempdb..#user') is not null drop table #user

create table #user (Id nvarchar(128), name nvarchar(500))

if @user_Ids is null
	begin
		insert into #user (Id, name)
		select UserId, isnull([User].[LastName], N'')+N' '+isnull([User].[FirstName], N'') from [CRM_1551_System].[dbo].[User]
	end
else
	begin
--[CRM_1551_System].[dbo].[User]
insert into #user (Id, name)
select [User].UserId, isnull([User].[LastName], N'')+N' '+isnull([User].[FirstName], N'')
from [CRM_1551_System].[dbo].[User] inner join
(
select value Id
from string_split(@user_Ids, N',')
) t on [User].UserId=t.Id
	end

declare @dates nvarchar(max)=
stuff((
select distinct N',['+ltrim(convert(date, [Complain].registration_date))+N']'
from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
inner join #user u on [AppealsFromSite].EditByUserId=u.Id
inner join [dbo].[Complain] on [AppealsFromSite].EditByUserId=[Complain].guilty
where convert(date, [Complain].registration_date) between convert(date, @date_from) and convert(date, @date_to)
for xml path ('')
),1,1,N'')

--select @dates

--select u.Id, u.name, convert(date, [Complain].registration_date) dat
--from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
--inner join #user u on [AppealsFromSite].EditByUserId=u.Id
--inner join [dbo].[Complain] on [AppealsFromSite].EditByUserId=[Complain].guilty
--where convert(date, [Complain].registration_date) between convert(date, @date_from) and convert(date, @date_to)


declare @query nvarchar(max)=N'
select user_id Id, name leg_name, '+@dates+N'
from
(select distinct [Complain].Id, u.Id user_id, u.name, convert(date, [Complain].registration_date) dat
from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
inner join #user u on [AppealsFromSite].EditByUserId=u.Id
inner join [dbo].[Complain] on [AppealsFromSite].EditByUserId=[Complain].guilty
where convert(date, [Complain].registration_date) between '''+ltrim(convert(date, @date_from))+N''' and '''+ltrim(convert(date, @date_to))+N''') t
pivot
(
count(Id)
for dat in ('+@dates+N')
) pvt
'
exec(@query)

--select @query