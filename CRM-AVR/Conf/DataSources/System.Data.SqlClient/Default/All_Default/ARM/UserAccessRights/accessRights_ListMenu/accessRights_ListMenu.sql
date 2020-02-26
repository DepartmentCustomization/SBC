SELECT [ARM_Menu].[Id]
      ,[Parent_Id]
      ,[Name]
     ,case when MenuSystemLogin.UserId is null then 0 else 1 end as MenuSystemLogin_IsActive
  FROM [dbo].[ARM_Menu]
 left join (
 select * from 
 [dbo].[ARM_MenuSystemLogin]
 where UserId =  @UserId
  ) as MenuSystemLogin on MenuSystemLogin.ARM_MenuId = [ARM_Menu].Id