--declare @user_Id nvarchar(128)=N'test'

  select 1 Id,

  (select count(Id)
  from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
  where AppealFromSiteResultId=1) on_moderation,

  (select count(Id)
  from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
  where [ReceiptDate] between datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 11, 0, 0, 0)
  and datetimefromparts(year(getutcdate()), month(getutcdate()), day(getutcdate()), 18, 0, 0, 0)
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