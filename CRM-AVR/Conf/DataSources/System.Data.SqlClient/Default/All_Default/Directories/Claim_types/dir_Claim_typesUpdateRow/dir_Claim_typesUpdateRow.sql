



/*
 declare @Id int=9228,
 @Is_delete bit='true';
 */
 /*
 UPDATE [dbo].[Claim_types]
	SET 
   --[Parent_сlaim_types_ID] =@Parent_сlaim_types_ID
     [Claim_class_ID]=@classes_id
     ,[Name]=@claim_types_name
     ,[Priority]=@Priority
     ,[Is_diameter_required]=@Is_diameter_required
     ,[Sort_index]=@Sort_index
     -- ,[TypeAccess_ID]=@TypeAccess_ID
     ,[Full_Name]=@full_name
     ,Is_delete=@Is_delete
	WHERE Id=@Id;
	*/
 if @Is_delete='true'
 begin
	 if object_id('tempdb..#temp_children') is not NULL drop table #temp_children;

	 with
	  childlen_t as
	  (
	  select [Id], [Parent_сlaim_types_ID], [Claim_types].[TypeAccess_ID],
			[Claim_types].[Claim_class_ID],
			[Claim_types].[Name],
			[Claim_types].[Full_Name],
			[Claim_types].[Sort_index],
			1 [my_sort]
	  from [dbo].[Claim_types]
	  where [Claim_types].Id=@Id
  
	  union all
	  select [Claim_types].[Id], [Claim_types].[Parent_сlaim_types_ID], [Claim_types].[TypeAccess_ID],
			[Claim_types].[Claim_class_ID],
			[Claim_types].[Name],
			[Claim_types].[Full_Name],
			[Claim_types].[Sort_index],
			childlen_t.[my_sort]+1 [my_sort]
	  from [dbo].[Claim_types] 
	  inner join  childlen_t
	  on [Claim_types].[Parent_сlaim_types_ID]=childlen_t.Id
	  )

	  --список с потомками потомков
	  select * 
	  into #temp_children
	  from childlen_t

	  --select * from #temp_children

	  --которые используются
	  if object_id('tempdb..#temp_children_use') is not NULL drop table #temp_children_use;

	  select t_children.Id, t_children.my_sort
	  into #temp_children_use
	  from [dbo].[Claims]
	  inner join #temp_children t_children on [Claims].Claim_type_ID=t_children.Id

	  --select * from #temp_children_use

	  --которые не используются
	  /*
	  select Id from #temp_children
	  except
	  select Id from #temp_children_use
	  except
	  select id 
	  from #temp_children 
	  where my_sort<=(select max(my_sort) from #temp_children_use)
	  */

	  --except
	  --select [Claim_types].Id 
	  --from [dbo].[Claim_types] inner join
	  --#temp_children_use temp_children_use on [Claim_types].Parent_сlaim_types_ID=temp_children_use.Id
	  --действия
	/**/
	  update [dbo].[Claim_types]
	  set [Is_delete]='true'
	  from [dbo].[Claim_types]
	  where id in (
	  select id 
	  from #temp_children 
	  where my_sort<=(select max(my_sort) from #temp_children_use)
	  )

	  delete
	  from [dbo].[Claim_types]
	  where Id in
	  (
	  select Id from #temp_children
	  except
	  select id 
	  from #temp_children 
	  where my_sort<=(select max(my_sort) from #temp_children_use)
	  )
	  
	  --PRINT N'Цей тип буде видалено, та більше не доступний для використання й редагування'
	  
  end


  --PRINT N'Цей тип буде видалено, та більше не доступний для використання й редагування'
  