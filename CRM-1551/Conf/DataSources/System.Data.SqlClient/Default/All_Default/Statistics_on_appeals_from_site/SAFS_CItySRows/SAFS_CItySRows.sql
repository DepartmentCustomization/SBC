  select 1 Id,
  (select count(distinct ApplicantFromSiteId) count_id
  from [CRM_1551_Site_Integration].[dbo].[ApplicantFromSiteAddresses]
  where AddressTypeId=1 and CityName=N'Київ') in_Kyiv
  ,
  (select count(distinct ApplicantFromSiteId) count_id
  from [CRM_1551_Site_Integration].[dbo].[ApplicantFromSiteAddresses]
  where CityName<>N'Київ') in_not_Kyiv