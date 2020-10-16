

 --declare @user_Id nvarchar(128)=N'test'

 declare @datetime_from datetime = 
 (
 DATEADD(HOUR,
      DATEDIFF(HOUR,
         CONVERT(datetime, SWITCHOFFSET(datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 11, 0, 0, 0), DATEPART(TZOFFSET,datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 11, 0, 0, 0) AT TIME ZONE 'E. Europe Standard Time'))),
         datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 11, 0, 0, 0)
         ), datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 11, 0, 0, 0))
 )
 --datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 11, 0, 0, 0);
 declare @datetime_to datetime = 
 --datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 18, 0, 0, 0);
 (
 DATEADD(HOUR,
      DATEDIFF(HOUR,
         CONVERT(datetime, SWITCHOFFSET(datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 18, 0, 0, 0), DATEPART(TZOFFSET,datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 11, 0, 0, 0) AT TIME ZONE 'E. Europe Standard Time'))),
         datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 18, 0, 0, 0)
         ), datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 18, 0, 0, 0))
 )

 --select @datetime_from, @datetime_to

  select 1 Id,

  (select count(Id)
  from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
  where AppealFromSiteResultId=1) on_moderation,

  (select count(Id)
  from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
  where [ReceiptDate] between @datetime_from
  and @datetime_to
  ) mutch_2hours,


  (select min([ReceiptDate])
  from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
  where AppealFromSiteResultId=1) oldest,

  --4.1 если есть несколько, открываю самое старое
  --если нет, то открываю любое или там где EditByUserId пустое ?
  (select case when
  (select min(Id)
  from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
  where AppealFromSiteResultId=1 and EditByUserId=@user_Id) is not null

  then (select min(Id)
  from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
  where AppealFromSiteResultId=1 and EditByUserId=@user_Id)

  else (select min(Id)
  from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
  where AppealFromSiteResultId=1 and EditByUserId is null) end) appeal_id