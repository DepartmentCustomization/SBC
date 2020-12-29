IF(select isnull(ltrim([Street_type_id]), N'')+isnull(Name, N'') from [dbo].[Streets] s where s.Id=@Id)=isnull(ltrim(@type_id), N'')+isnull(@Name, N'')
	  BEGIN
		RAISERROR(N'Слід коректно ввести назву вулиці', 16, 1);
		RETURN;
  END

ELSE
	BEGIN
		UPDATE
		   [dbo].[Streets]
		SET
		   [Street_type_id] = @type_id,
		   [Name] = @Name,
		   [Old_name] = @Old_name,
		   [Territory] = @Territory
		WHERE
		   Id = @Id;
	END