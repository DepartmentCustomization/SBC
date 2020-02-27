if OBJECT_ID ('tempdb..#old') is not null drop table #old
create table #old (Id int, Name nvarchar(200))
	insert into #old (Id, Name)
	select Id, name from [GORODOK_Integrartion].[dbo].Gorodok_streets_old

--select * from #old


MERGE #old as old
USING [GORODOK_Integrartion].[dbo].Gorodok_streets_new as new
on (new.Id = old.Id)
	WHEN MATCHED and old.name <> new.name THEN
		update set name = new.name
	WHEN NOT MATCHED THEN
		insert (Id, Name)
		values (new.id, new.Name)
	WHEN NOT MATCHED BY SOURCE THEN
		delete
	OUTPUT $action AS operation, 
		 Inserted.Id as new_id
		,Inserted.Name as new_name
		,Deleted.Id as old_id
		,Deleted.Name as old_name
	;
