 --declare @UserId nvarchar(128) = N'29796543-b903-48a6-9399-4840f6eac396'
 --declare @claim_type_id int = 13
 --declare @house_id nvarchar(128) = N'54185F30-371B-11E7-99DB-000C29FF5864'


if (
		select count(1)
		from (
		  SELECT [employees_claim_types].[employee_id]
		  FROM [dbo].[employees_claim_types]
		  INNER JOIN [dbo].[employees_houses] on [employees_houses].employee_id = [employees_claim_types].employee_id
		  where [claim_type_id] = @claim_type_id 
		  and [house_id] = convert(uniqueidentifier, @house_id)
		) as t1 ) > 0
begin
	    select top 1 t1.employee_id, [employees].[PIB]
		from (
		  SELECT [employees_claim_types].[employee_id]
		  FROM [dbo].[employees_claim_types]
		  INNER JOIN [dbo].[employees_houses] on [employees_houses].employee_id = [employees_claim_types].employee_id
		  where [claim_type_id] = @claim_type_id 
		  and [house_id] = convert(uniqueidentifier, @house_id)
		) as t1
		left join [dbo].[employees] on [employees].[Id] = t1.employee_id
end
else
begin
		select top 1 [Id],[PIB] 
		from [dbo].[employees] 
		where [UserId] = @UserId

end