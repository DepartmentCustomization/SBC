--declare @UserId nvarchar(128) = '29796543-b903-48a6-9399-4840f6eac396';


SELECT [ARM_Menu].[Id]
      ,[ARM_Menu].[Parent_Id]
      ,[ARM_Menu].[Name]

 FROM [dbo].[ARM_Menu]
 where [ARM_Menu].[Id] not in (

select table1.Id from (
		SELECT [ARM_Menu].[Id]
			  ,[Parent_Id]


		 FROM [dbo].[ARM_Menu]
		 left join (
		 select * from 
		 [dbo].[ARM_MenuSystemLogin]
		 where UserId =  @UserId
		  ) as MenuSystemLogin on MenuSystemLogin.ARM_MenuId = [ARM_Menu].Id
		  where case when MenuSystemLogin.UserId is null then 0 else 1 end = 1

		union all 
		(
		SELECT [ARM_Menu].[Id]
			  ,[Parent_Id]
		  FROM [dbo].[ARM_Menu]
		  where [ARM_Menu].[Id] in (
		SELECT [Parent_Id]
		  FROM [dbo].[ARM_Menu]
		 left join (
		 select * from 
		 [dbo].[ARM_MenuSystemLogin]
		 where UserId =  @UserId
		  ) as MenuSystemLogin on MenuSystemLogin.ARM_MenuId = [ARM_Menu].Id
		  where case when MenuSystemLogin.UserId is null then 0 else 1 end = 1
		  )
		  )

		union all 
		SELECT [ARM_Menu].[Id]
			  ,[Parent_Id]
		  FROM [dbo].[ARM_Menu]
		  where [ARM_Menu].[Id] in (
		(
		SELECT [Parent_Id]
		  FROM [dbo].[ARM_Menu]
		  where [ARM_Menu].[Id] in (
		SELECT [Parent_Id]
		  FROM [dbo].[ARM_Menu]
		 left join (
		 select * from 
		 [dbo].[ARM_MenuSystemLogin]
		 where UserId =  @UserId
		  ) as MenuSystemLogin on MenuSystemLogin.ARM_MenuId = [ARM_Menu].Id
		  where case when MenuSystemLogin.UserId is null then 0 else 1 end = 1
		  )
		  )
		  )
) as table1

)