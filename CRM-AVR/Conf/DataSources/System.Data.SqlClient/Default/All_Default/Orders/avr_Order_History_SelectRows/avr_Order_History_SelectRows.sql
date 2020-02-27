SELECT [Id]
	  ,isnull((SELECT Surname  +' '+ First_name from Contacts 
		where Id =  (select Contacts_ID from Jobs where [Login] = 
			[User] )), 'mainAdmin') as [User]
      ,[Field]
      ,[New_Value]
      ,[Date]
  FROM [dbo].[Orders_History]
  where Order_ID =  @Id
  and #filter_columns#
	#sort_columns#
    --   order by Date
      offset @pageOffsetRows rows fetch next @pageLimitRows rows only


/*;WITH All_history
AS(
 SELECT [Id]
	  ,isnull((SELECT Surname  +' '+ First_name from Contacts 
		where Job_ID =  (select id from Jobs where [Login] = 
			[User] )), 'mainAdmin') as [User]
      ,[Field]
      ,[New_Value]
      ,[Date]
  FROM [dbo].[Orders_History]
  where Order_ID =  @Id

  union all 

  select 
	   Id
	  ,isnull((SELECT Surname  +' '+ First_name from Contacts 
		where Job_ID =  (select id from Jobs where [Login] = 
			[User] )), 'mainAdmin') as [User]
      ,[Field]
      ,[New_Value]
      ,[Date]
  from Actions_History
  where Order_ID = @Id
  
  union all 

  select 
	   Id
	  ,isnull((SELECT Surname  +' '+ First_name from Contacts 
		where Job_ID =  (select id from Jobs where [Login] = 
			[User] )), 'mainAdmin') as [User]
      ,[Field]
      ,[New_Value]
      ,[Date]
  from Faucet_History
  where Order_ID = @Id
)

select Id
	  ,[User]
      ,[Field]
      ,[New_Value]
      ,[Date] from All_history 
      where  
      #filter_columns#
-- 	#sort_columns#
      order by Date
      offset @pageOffsetRows rows fetch next @pageLimitRows rows only
      
      */