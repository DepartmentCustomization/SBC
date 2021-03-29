select Id, Name from
(
select DISTINCT Order_Created_By.UserId Id, 
isnull(Order_Created_By.Firstname,'')+isnull(N' ' + Order_Created_By.Patronymic,'') +isnull(N' ' + Order_Created_By.LastName,'') + isnull(N' (' + uio_created_by.JobTitle + N')','')
Name
from   
  [CRM_AVR_System].[dbo].[User] Order_Created_By 
  left join (select UserId, max(id) uio_id from [CRM_AVR_System].[dbo].[UserInOrganisation] group by UserId) uio_created_min on uio_created_min.UserId = Order_Created_By.UserId
  left join [CRM_AVR_System].[dbo].[UserInOrganisation] uio_created_by on uio_created_by.Id  = uio_created_min.uio_id

) t

   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only

